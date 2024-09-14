export const DB_NAME = 'MyAppStorage'
export const DB_VERSION = 1
export const STORE_NAME = 'data'

export class IndexedDBStorage {
    private storeName: string

    private dbVersion: number

    // public db: IDBDatabase | null
    constructor(storeName: string, dbVersion: number) {
        this.storeName = storeName
        this.dbVersion = dbVersion
    }

    private async executeDBOperation(
        method: 'add' | 'get' | 'delete' | 'put' | 'getAllKeys',
        args?: any,
        mode: IDBTransactionMode = 'readwrite',
    ): Promise<Event> {
        return new Promise((resolve, reject) => {
            this.#getDBObjectStore(mode)
                .then(objectStore => {
                    const request = objectStore[method](args)

                    request.onerror = event => reject(event)
                    request.onsuccess = event => resolve(event)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    #getDBObjectStore(mode: IDBTransactionMode) {
        return new Promise<IDBObjectStore>((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION)

            request.onerror = () => reject(request.error)

            request.onupgradeneeded = event => {
                const db = (event.target as IDBOpenDBRequest).result
                db.createObjectStore(STORE_NAME, { keyPath: 'id' })
            }

            request.onsuccess = event => {
                const db = (event.target as IDBOpenDBRequest).result
                const transaction = db.transaction([this.storeName], mode)
                const objectStore = transaction.objectStore(this.storeName)
                resolve(objectStore)
            }
        })
    }

    async write(key: string, data: string, checksum?: string) {
        // const checksum = this.calculateChecksum(value)
        // await this.validateChecksum(key, data, checksum)
        await this.executeDBOperation(
            'add',
            { id: key, value: data },
            'readwrite',
        )
    }

    async read(key: string, checksum?: string) {
        const event = await this.executeDBOperation('get', key)
        const data = (event.target as any)?.result?.value
        console.log("event", event)
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

// export function stringToArrayBuffer(str: string) {
//     const buffer = new ArrayBuffer(str.length * 2) // 2 bytes for each char
//     const view = new Uint16Array(buffer)
//     for (let i = 0; i < str.length; i++) {
//         view[i] = str.charCodeAt(i)
//     }
//     return buffer
// }

// export function arrayBufferToString(buffer: ArrayBuffer) {
//     return String.fromCharCode.apply(null, new Uint16Array(buffer))
// }
