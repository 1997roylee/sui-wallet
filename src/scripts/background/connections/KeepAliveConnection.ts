import { PortName } from '../utils/constants'
import Port from '../utils/port'

// https://github.com/suiet/suiet/blob/63b50e4ba225b294af1018f3f98b9666738837c7/packages/chrome/src/scripts/background/connections/KeepAliveConnection.ts#L16
export default class KeepAliveConnection {
    private static KEEP_ALIVE_INTERVAL = 3000
    #port: Port | null = null
    #timer: any = null
    #origin: string = 'UNKNOWN'

    constructor(origin: string) {
        this.#origin = origin
    }

    /**
     * Workaround to avoid service-worker be killed by Chrome
     * https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension
     */
    public connect() {
        const newPort = new Port(
            chrome.runtime.connect({ name: PortName.SUI_WALLET_KEEP_ALIVE }),
        )
        // Everytime the port gets killed, reconnect it
        newPort.onDisconnect.addListener(() => {
            this.connect()
        })
        this.#port = newPort
        this.#reportHeartBeats()
    }

    #reportHeartBeats() {
        if (this.#timer) {
            clearInterval(this.#timer)
        }

        this.#timer = setInterval(() => {
            this.#sendHeartBeatPackets()
        }, KeepAliveConnection.KEEP_ALIVE_INTERVAL)
    }

    #sendHeartBeatPackets() {
        if (!this.#port) {
            console.log('failed to report heart beats: port is null')
            return
        }

        try {
            this.#port.postMessage({
                type: 'KEEP_ALIVE',
                origin: this.#origin,
                payload: 'PING',
            })
        } catch (e) {
            console.error('failed to report heart beats', e)
        }
    }
}
