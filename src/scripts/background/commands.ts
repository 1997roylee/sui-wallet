import { createWallet } from './create-wallet'
import { createCommand, createCommandPayload } from './utils/command'
import { DB } from './db'

export const createWalletCommand = createCommandPayload('createWallet')
export const getWalletCommand = createCommandPayload('getWallet')

export const commands = [
    createCommand({
        name: 'createWallet',
        callback: async () => {
            const vault = await createWallet()
            await DB.setItem('vault', JSON.stringify(vault))
            return vault
        },
    }),
    createCommand({
        name: 'getWallet',
        callback: async () => {
            const vault = await DB.getItem<string>('vault')

            if (!vault) {
                throw new Error('Vault not found')
            }

            return JSON.parse(vault)
        },
    }),
]
