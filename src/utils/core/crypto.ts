import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import { ModeOfOperation } from 'aes-js'
import { Cipher } from './utils'
import { WALLET_MASTER_SECRET } from './constants'
import { Buffer } from 'buffer';

export function generateMnemonic(): string {
    return bip39.generateMnemonic(wordlist)
}

export function validateMnemonic(mnemonic: string): boolean {
    return bip39.validateMnemonic(mnemonic, wordlist)
}

export function validateToken(token: string, cipher: Cipher): boolean {
    const aesCtr = new ModeOfOperation.ctr(Buffer.from(token))

    const data = Buffer.from(cipher.data, 'hex')
    const secretBytes = aesCtr.decrypt(data)
    const secret = new TextDecoder().decode(secretBytes)
    return secret === WALLET_MASTER_SECRET
}
