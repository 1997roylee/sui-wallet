import { IndexedDBStorage } from '../../../scripts/background/db'
import { platform } from '@/utils/platform'
import { StoreName } from '../constants'
import { Wallet } from '../wallet'

export class VaultStorage {
    #db: IndexedDBStorage
    constructor(database: IDBDatabase) {
        this.#db = new IndexedDBStorage(database, StoreName.WALLET)
    }

    public async loadWallet(): Promise<Wallet | null> {
        const vault = await this.#db.read('vault')
        return vault ? JSON.parse(vault) : null
    }

    public async saveWallet(vault: Wallet) {
        await this.#db.write('vault', JSON.stringify(vault))
        return true
    }

    public async reset() {
        await this.#db.delete('vault')
    }
}

export function getVaultStorage(database: IDBDatabase) {
    if (platform.isBrowser || platform.isisExtBackgroundServiceWork) {
        return new VaultStorage(database)
    }

    return undefined
}
