import { ModeOfOperation } from 'aes-js'
import { PBKDF2_NUM_OF_ITERATIONS, WALLET_MASTER_SECRET } from './constants'
import { validateMnemonic } from './crypto'
import CryptoJS from 'crypto-js'
import { Buffer } from 'buffer';

export type Cipher = {
    data: string
    salt: string
}

export type Token = {
    token: string
    cipher: Cipher
}

export function encryptMnemonic(mnemonic: string, token: string): Buffer {
    const aesCtr = new ModeOfOperation.ctr(Buffer.from(token))
    const mnemonicBytes = new TextEncoder().encode(mnemonic)
    return Buffer.from(aesCtr.encrypt(mnemonicBytes))
}

export function decryptMnemonic(
    encryptedMnemonic: string,
    token: string,
): string {
    const aesCtr = new ModeOfOperation.ctr(Buffer.from(token))
    const encryptedBytes = Buffer.from(encryptedMnemonic, 'hex')
    const mnemonicBytes = aesCtr.decrypt(encryptedBytes)
    const mnemonic = new TextDecoder().decode(mnemonicBytes)
    if (!validateMnemonic(mnemonic)) {
        throw new Error('Invalid password')
    }
    return mnemonic
}

export function encryptPrivate(token: Buffer, privateKey: ArrayBuffer): Buffer {
    const aesCtr = new ModeOfOperation.ctr(token)
    return Buffer.from(aesCtr.encrypt(privateKey))
}

// export function decryptPrivate(
//     token: Buffer,
//     encryptedPrivate: string,
// ): elliptic.eddsa.KeyPair {
//     const aesCtr = new ModeOfOperation.ctr(token)
//     const encryptedBytes = Buffer.from(encryptedPrivate, 'hex')
//     const privateBytes = aesCtr.decrypt(encryptedBytes)
//     let keyPair
//     try {
//         keyPair = new elliptic.eddsa('ed25519').keyFromSecret(
//             Buffer.from(privateBytes),
//         )
//     } catch (e) {
//         throw new Error('Invalid password')
//     }
//     return keyPair
// }

export function newToken(password: string): Token {
    const salt = CryptoJS.lib.WordArray.random(128 / 8)
    // console.log('salt', salt)
    const token = password2Token(password, salt)
    const aesCtr = new ModeOfOperation.ctr(Buffer.from(token.toString(CryptoJS.enc.Hex)))
    const secretBytes = new TextEncoder().encode(WALLET_MASTER_SECRET)
    return {
        token: token.toString(CryptoJS.enc.Hex),
        cipher: {
            data: Buffer.from(aesCtr.encrypt(secretBytes)).toString('hex'),
            salt: salt.toString(CryptoJS.enc.Hex),
        },
    }
}

export function password2Token(password: string, salt: CryptoJS.lib.WordArray) {
    const hash = CryptoJS.PBKDF2(password, salt, {
        keySize: 128 / 32,
        iterations: PBKDF2_NUM_OF_ITERATIONS,
    })
    return hash
}