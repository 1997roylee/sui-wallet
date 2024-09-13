import { PortName } from '@/scripts/background/utils/constants'
import Port from '@/scripts/background/utils/port'
import { CommandPayload } from '../../scripts/background/utils/command'

export default class Connection {
    private static instance: Connection
    private port: Port

    private constructor() {
        this.port = new Port(
            chrome.runtime.connect({ name: PortName.SUI_WALLET_UI_BACKGROUND }),
        )
        // this.port = chrome.runtime.connect({
        //     name: PortName.SUI_WALLET_UI_BACKGROUND,
        // })
    }

    static getInstance() {
        if (!Connection.instance) {
            Connection.instance = new Connection()
        }
        return Connection.instance
    }

    send<TResponse extends any, TData extends unknown = unknown>(
        payload: CommandPayload<TData>,
    ): Promise<TResponse> {
        this.port.send(payload.name, payload.data)

        return new Promise((resolve, reject) => {
            const timeoutHandler = setTimeout(() => {
                reject('timeout')
            }, 1000 * 10)

            this.port.on(payload.name, (data: any) => {
                clearTimeout(timeoutHandler)
                resolve(data as TResponse)
            })
        })
    }

    onMessage(callback: (message: any) => void) {
        this.port.onMessage.addListener(callback)
    }

    onDisconnect(callback: (port: chrome.runtime.Port) => void) {
        this.port.onDisconnect.addListener(callback)
    }
}
