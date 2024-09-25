import { Auth, validateAuthToken } from '@/utils/core/auth'
import { createCommand, createCommandPayload } from './utils/command'
import { getMetaStorage } from '@/utils/core/storages/meta-storage'
import { Factory } from '@/utils/core/wallet/factory'
import { getVaultStorage } from '@/utils/core/storages/vault-storage'
import { decryptMnemonic } from '@/utils/core/utils'

export const createWalletCommand = createCommandPayload('createWallet')
export const getWalletCommand = createCommandPayload('getWallet')
export const initPasswordCommand = createCommandPayload('initPassword')
export const revealMnemonicCommand = createCommandPayload('revealMnemonic')
export const verifyPasswordCommand = createCommandPayload('verifyPassword')
export const getIsAuthedCommand = createCommandPayload('getIsAuthed')


export interface CommandCallbackPayload {
    auth: Auth
    data: any
    db: IDBDatabase
}

export const commands = [
    createCommand({
        name: 'createWallet',
        callback: async ({ auth, db }: CommandCallbackPayload) => {
            const token = await auth.getToken()

            if (!token) {
                throw new Error('Token not found')
            }

            const walletFactory = new Factory(getMetaStorage(db)!)
            const wallet = await walletFactory.createWallet({
                token,
            })

            console.log('wallet', wallet)

            const vaultStorage = getVaultStorage(db)
            await vaultStorage!.saveWallet(wallet)

            return wallet
        },
    }),
    createCommand({
        name: 'getWallet',
        callback: async ({ db, auth }: CommandCallbackPayload) => {
            const token = await auth.getToken()

            if (!token) {
                throw new Error('Token not found')
            }

            const vaultStorage = getVaultStorage(db)
            const wallet = await vaultStorage!.loadWallet()

            console.log('wallet', wallet)
            if (!wallet) {
                throw new Error('Vault not found')
            }

            return wallet
        },
    }),
    createCommand({
        name: 'initPassword',
        callback: async ({ auth, data }: CommandCallbackPayload) => {
            return auth.initPassword(data)
        },
    }),
    createCommand({
        name: 'verifyPassword',
        callback: async ({ auth, data }: CommandCallbackPayload) => {
            return auth.verifyPassword(data)
        },
    }),
    createCommand({
        name: 'getIsAuthed',
        callback: async ({ auth }: CommandCallbackPayload) => {
            return auth.getIsAuthorized()
        },
    }),
    createCommand({
        name: 'revealMnemonic',
        callback: async ({ auth, db, data }: CommandCallbackPayload) => {
            const token = await auth.getToken()

            if (!token) {
                throw new Error('Token not found')
            }

            const metaStorage = getMetaStorage(db)

            if (!metaStorage) {
                throw new Error('No Meta Storage')
            }

            await validateAuthToken(metaStorage, token)

            return decryptMnemonic(data, token)
        },
    }),
]
