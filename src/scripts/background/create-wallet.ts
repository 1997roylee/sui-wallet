import Vault from '@/services/vault'

export async function createWallet(password: string) {
    const mnemonic = await Vault.generateWalletMnemonic()

    return Vault.fromMneomic(mnemonic)
}
