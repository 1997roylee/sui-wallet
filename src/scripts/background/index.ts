import { getMetaStorage } from '@/utils/core/storages/meta-storage'
import { commands } from './commands'
import { IndexedDBStorage } from './db'
import { PortName } from './utils/constants'
import Port from './utils/port'
import { Auth } from '@/utils/core/auth'
// import { DB_VERSION, StoreName } from '@/utils/core/constants'

function listenToKeepAliveChannel() {
    chrome.runtime.onConnect.addListener(newPort => {
        if (newPort.name !== PortName.SUI_WALLET_KEEP_ALIVE) return

        newPort.onMessage.addListener(msg => {
            if (msg.type !== 'KEEP_ALIVE') return
            newPort.postMessage({ type: 'KEEP_ALIVE', payload: 'PONG' })
        })
    })
}

;(async function main() {
    const db =  await IndexedDBStorage.createConnection()
    const auth = new Auth(getMetaStorage(db)!)

    chrome.runtime.onInstalled.addListener((): void => {
        // eslint-disable-next-line no-console
        console.log('Extension installed')
    })

    listenToKeepAliveChannel()

    chrome.runtime.onConnect.addListener(rawPort => {
        if (rawPort.name === PortName.SUI_WALLET_UI_BACKGROUND) {
            const port = new Port(rawPort)

            commands.forEach(command => {
               try {
                port.on(command.name, async data => {
                    const result = await command.callback({ auth, data, db })
                    port.send(command.name, result)
                })
               } catch (error) {
                console.error('Error in command', command.name, error)
               }
            })

            port.onDisconnect.addListener(() => {
                console.log('Popup disconnected')
            })
        }
    })
})()
