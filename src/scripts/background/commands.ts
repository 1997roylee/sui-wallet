import { createWallet } from './create-wallet'
import { createCommand, createCommandPayload } from './utils/command'
import { DB_VERSION, IndexedDBStorage, STORE_NAME } from './db'

export const createWalletCommand = createCommandPayload('createWallet')
export const getWalletCommand = createCommandPayload('getWallet')

const DB = new IndexedDBStorage(STORE_NAME, DB_VERSION)

export const commands = [
    createCommand({
        name: 'createWallet',
        callback: async () => {
            const vault = await createWallet()

            await DB.write('vault', JSON.stringify(vault))
            return vault
        },
    }),
    createCommand({
        name: 'getWallet',
        callback: async () => {
            const vault = await DB.read('vault')

            console.log("vault", vault)
            if (!vault) {
                throw new Error('Vault not found')
            }

            return JSON.parse(vault)
        },
    }),
]
