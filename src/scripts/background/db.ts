import { StoreName, DB_VERSION } from '@/utils/core/constants'

export const DB_NAME = 'PoseidonSuiDB'

export class IndexedDBStorage {
    #database: IDBDatabase
    #storeName: string

    constructor(database: IDBDatabase, storeName: string) {
        this.#database = database
        this.#storeName = storeName
    }

    private async executeDBOperation(
        method: 'add' | 'get' | 'delete' | 'put' | 'getAllKeys',
        args?: any,
        mode: IDBTransactionMode = 'readwrite',
    ): Promise<Event> {
        return new Promise((resolve, reject) => {
            const transaction = this.#database.transaction(
                [this.#storeName],
                mode,
            )
            const objectStore = transaction.objectStore(this.#storeName)
            const request = objectStore[method](args)

            request.onerror = event => reject(event)
            request.onsuccess = event => resolve(event)
        })
    }

    public static createConnection() {
        return new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION)

            request.onerror = () => {
                console.error('Failed to open indexedDB')
                reject(request.error)
            }

            request.onupgradeneeded = event => {
                const db = (event.target as IDBOpenDBRequest).result
                db.createObjectStore(StoreName.META, { keyPath: 'id' })
                db.createObjectStore(StoreName.WALLET, { keyPath: 'id' })
            }

            request.onsuccess = event => {
                // const db = (event.target as IDBOpenDBRequest).result
                // const transaction = db.transaction([this.storeName], mode)
                // const objectStore = transaction.objectStore(this.storeName)
                // resolve(objectStore)
                resolve((event.target as IDBOpenDBRequest).result)
            }
            
        })
    }

    async write(key: string, data: string, checksum?: string) {
        // const checksum = this.calculateChecksum(value)
        // await this.validateChecksum(key, data, checksum)
        await this.executeDBOperation(
            'put',
            { id: key, value: data },
            'readwrite',
        )
    }

    async read(key: string, checksum?: string) {
        const event = await this.executeDBOperation('get', key)
        const data = (event.target as any)?.result?.value
        console.log('event', event)
        // await this.validateChecksum(key, data, checksum)
        return data
    }

    async delete(key: string) {
        await this.executeDBOperation('delete', key)
    }

    // async validateChecksum(key: string, data: ArrayBuffer, checksum: string) {
    //     const hash = await crypto.subtle.digest('SHA-256', data)
    //     const hashString = Array.from(new Uint8Array(hash))
    //         .map(b => b.toString(16).padStart(2, '0'))
    //         .join('')

    //     if (hashString !== checksum) {
    //         throw new Error(`Checksum mismatch for key ${key}`)
    //     }
    // }
}