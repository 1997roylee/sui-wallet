import { Ed25519Keypair, Ed25519PublicKey } from '@mysten/sui/keypairs/ed25519'
import { decryptMnemonic } from '../utils';

export interface Key {
    getPublicKey(): Buffer
    getPublicHexString(): string
    getPrivateKey(): Buffer
    sign(message: Buffer): Buffer
    verify(digest: Buffer, signature: Buffer): boolean
}

export class Vault {
    #keyPair: Ed25519Keypair

    constructor(keyPair: Ed25519Keypair) {
        this.#keyPair = keyPair
    }

    get publicAddress() {
        return this.#keyPair.getPublicKey().toBase64()
    }

    public static fromMnemonic(mnemonic: string) {
        const keyPair = Ed25519Keypair.deriveKeypair(mnemonic)
        return new Vault(keyPair)
    }

    public static fromEncryptedMnemonic(encryptedMnemonic: string, token: string) {
        const mnemonic = decryptMnemonic(encryptedMnemonic, token)
        return Vault.fromMnemonic(mnemonic)
    }
}

export default Vault
