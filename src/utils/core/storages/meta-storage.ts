import { Cipher } from '@/utils/core/utils'
import { IndexedDBStorage } from '../../../scripts/background/db'
import { platform } from '@/utils/platform'
import { StoreName } from '../constants'

export type Meta = {
    walletId: number
    walletVersion: number
    cipher: Cipher
}

export class MetaStorage {
    #db: IndexedDBStorage
    constructor(database: IDBDatabase) {
        this.#db = new IndexedDBStorage(database, StoreName.META)
    }

    public async loadMeta(): Promise<Meta | null> {
        const meta = await this.#db.read('meta')
        
        return meta ? JSON.parse(meta) : null
    }

    public async saveMeta(meta: Meta) {
        await this.#db.write('meta', JSON.stringify(meta))
        return true
    }

    public async reset() {
        await this.#db.delete('meta')
    }
}

export function getMetaStorage(database: IDBDatabase) {
    if (platform.isBrowser || platform.isisExtBackgroundServiceWork) {
        return new MetaStorage(database)
    }

    return undefined
}
