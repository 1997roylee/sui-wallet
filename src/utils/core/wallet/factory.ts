import { validateAuthToken } from '../auth'
import { MetaStorage } from '../storages/meta-storage'
import { encryptMnemonic } from '../utils'
import { generateMnemonic } from '../crypto'
import { Wallet } from './wallet'
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'

export type CreateWalletParams = {
    token: string // password token
    importedMnemonic?: string
}

// export interface IWallet {
//     id: string
//     name: string
//     isImported?: boolean
// }

export class Factory {
    #metaStorage: MetaStorage

    constructor(metaStorage: MetaStorage) {
        this.#metaStorage = metaStorage
    }

    public async createWallet(params: CreateWalletParams) {
        const { token } = params
        await validateAuthToken(this.#metaStorage, token)

        let mnemonic: string
        if (params.importedMnemonic) {
            mnemonic = params.importedMnemonic
        } else {
            mnemonic = generateMnemonic()
        }

        // implement: check if wallet already exists
        const encryptedMnemonic = encryptMnemonic(mnemonic, token)
        const address = Ed25519Keypair.deriveKeypair(mnemonic)
            .getPublicKey()
  
            console.log('address', address)

        return Wallet.buildInstance({
            id: '1',
            name: 'wallet',
            address: address.toSuiAddress(),
            encryptMnemonic: encryptedMnemonic.toString('hex'),
            isImported: false,
        })
    }
}
