import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'

export function generateMnemonic(): string {
    return bip39.generateMnemonic(wordlist)
}

export function validateMnemonic(mnemonic: string): boolean {
    return bip39.validateMnemonic(mnemonic, wordlist)
}
