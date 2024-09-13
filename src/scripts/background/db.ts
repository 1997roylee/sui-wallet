export const DB = {
    getItem: async <TResponse extends unknown>(
        name: string,
    ): Promise<TResponse | null> => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MyAppDB', 1)
            request.onerror = () => reject(request.error)
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction('store', 'readonly')
                const store = transaction.objectStore('store')
                const getValue = store.get(name)
                getValue.onerror = () => reject(getValue.error)
                getValue.onsuccess = () => resolve(getValue.result)
            }
            request.onupgradeneeded = () => {
                const db = request.result
                db.createObjectStore('store')
            }
        })
    },
    setItem: async (name: string, value: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MyAppDB', 1)
            request.onerror = () => reject(request.error)
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction('store', 'readwrite')
                const store = transaction.objectStore('store')
                const setValue = store.put(value, name)
                setValue.onerror = () => reject(setValue.error)
                setValue.onsuccess = () => resolve()
            }
            request.onupgradeneeded = () => {
                const db = request.result
                db.createObjectStore('store')
            }
        })
    },
    removeItem: async (name: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('MyAppDB', 1)
            request.onerror = () => reject(request.error)
            request.onsuccess = () => {
                const db = request.result
                const transaction = db.transaction('store', 'readwrite')
                const store = transaction.objectStore('store')
                const deleteValue = store.delete(name)
                deleteValue.onerror = () => reject(deleteValue.error)
                deleteValue.onsuccess = () => resolve()
            }
        })
    },
}
