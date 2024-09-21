export interface NewWalletParams {
    id: string
    name: string
    address: string
    encryptMnemonic?: string
    isImported?: boolean
}

export class Wallet {
    id: string
    name: string
    address: string
    encryptMnemonic?: string
    isImported?: boolean
    // accounts
    constructor({ id, name, address, encryptMnemonic }: NewWalletParams) {
        this.id = id
        this.name = name
        this.address = address
        this.encryptMnemonic = encryptMnemonic
    }

    public static buildInstance(params: NewWalletParams) {
        return new Wallet(params)
    }
}
