import { Ed25519Keypair, Ed25519PublicKey } from '@mysten/sui/keypairs/ed25519'
// import bcrypt from 'bcryptjs'
import { generateMnemonic } from '@scure/bip39'
import CryptoJS from 'crypto-js'
import { wordlist } from '@scure/bip39/wordlists/english'

export interface Key {
    getPublicKey(): Buffer
    getPublicHexString(): string
    getPrivateKey(): Buffer
    sign(message: Buffer): Buffer
    verify(digest: Buffer, signature: Buffer): boolean
}

export class Vault {
    publicKey: Ed25519PublicKey
    privateKey: string
    mnemonic: string

    constructor(keyPair: Ed25519Keypair, mnemonic: string) {
        this.publicKey = keyPair.getPublicKey()
        this.privateKey = keyPair.getSecretKey()
        this.mnemonic = mnemonic
    }

    get publicAddress() {
        return this.publicKey.toBase64()
    }

    public static async generateWalletMnemonic() {
        return generateMnemonic(wordlist)
    }

    public static fromMneomic(mnemonic: string) {
        const keyPair = Ed25519Keypair.deriveKeypair(mnemonic)
        return new Vault(keyPair, mnemonic)
    }
}

export default Vault
