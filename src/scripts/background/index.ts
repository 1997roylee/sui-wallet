import { commands } from './commands'
import { PortName } from './utils/constants'
import Port from './utils/port'

function listenToKeepAliveChannel() {
    chrome.runtime.onConnect.addListener(newPort => {
        if (newPort.name !== PortName.SUI_WALLET_KEEP_ALIVE) return

        newPort.onMessage.addListener(msg => {
            if (msg.type !== 'KEEP_ALIVE') return
            newPort.postMessage({ type: 'KEEP_ALIVE', payload: 'PONG' })
        })
    })
}

;(function main() {
    chrome.runtime.onInstalled.addListener((): void => {
        // eslint-disable-next-line no-console
        console.log('Extension installed')
    })

    listenToKeepAliveChannel()

    chrome.runtime.onConnect.addListener(rawPort => {
        if (rawPort.name === PortName.SUI_WALLET_UI_BACKGROUND) {
            const port = new Port(rawPort)

            commands.forEach(command => {
                port.on(command.name, async data => {
                    const result = await command.callback(data)
                    port.send(command.name, result)
                })
            })
            // port.on('greeting', data => {
            //     console.log('Received greeting:', data)
            //     port.send('response', 'Hello from background!')
            // })

            port.onDisconnect.addListener(() => {
                console.log('Popup disconnected')
            })
        }
    })
})()
