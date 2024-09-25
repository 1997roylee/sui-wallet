import { getMetaStorage } from '@/utils/core/storages/meta-storage'
import { commands } from './commands'
import { IndexedDBStorage } from './db'
import { PortName } from './utils/constants'
import Port from './utils/port'
import { Auth } from '@/utils/core/auth'
import ApiProxy from './api-proxy'

// Reference: https://github.com/suiet/suiet/blob/63b50e4ba225b294af1018f3f98b9666738837c7/packages/chrome/src/scripts/background/index.ts#L31
function listenToKeepAliveChannel() {
    chrome.runtime.onConnect.addListener(newPort => {
        if (newPort.name !== PortName.SUI_WALLET_KEEP_ALIVE) return

        newPort.onMessage.addListener(msg => {
            if (msg.type !== 'KEEP_ALIVE') return

            console.log('Received keep alive message', msg)
            newPort.postMessage({ type: 'KEEP_ALIVE', payload: 'HELLO WORLD' })
        })
    })
}

;(async function main() {
    chrome.runtime.onInstalled.addListener((): void => {
        // eslint-disable-next-line no-console
        console.log('Extension installed')
    })

    listenToKeepAliveChannel()

    const apiProxy = new ApiProxy()
    chrome.runtime.onConnect.addListener(port => {
        apiProxy.connect(new Port(port))
    })
    // chrome.runtime.onConnect.addListener(rawPort => {
    //     if (rawPort.name === PortName.SUI_WALLET_UI_BACKGROUND) {
    //         const port = new Port(rawPort)

    //         commands.forEach(command => {
    //             try {
    //                 port.on(command.name, async data => {
    //                     const result = await command.callback({
    //                         auth,
    //                         data,
    //                         db,
    //                     })
    //                     port.send(command.name, result)
    //                 })
    //             } catch (error) {
    //                 console.error('Error in command', command.name, error)
    //             }
    //         })

    //         port.onDisconnect.addListener(() => {
    //             console.log('Popup disconnected')
    //         })
    //     }
    // })
})()
