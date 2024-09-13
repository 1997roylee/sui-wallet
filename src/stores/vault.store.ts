import Vault from '@/services/vault'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface VaultState {
    vault: Vault | null
    balance: number
    status: 'UNINITIALIZED' | 'INITIALIZED' | 'LOCKED' | 'UNLOCKED'
    setBalance: (balance: number) => void
    setStatus: (status: VaultState['status']) => void
    setVault: (vault: Vault) => void
    resetVault: () => void
}

const indexedDBStorage = {
    getItem: async (name: string): Promise<string | null> => {
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

const useVaultStore = create<VaultState>()(
    persist(
        set => ({
            vault: null,
            balance: 0,
            status: 'UNINITIALIZED',
            setBalance: balance => set({ balance }),
            setStatus: status => set({ status }),
            setVault: vault => set({ vault }),
            resetVault: () =>
                set({
                    vault: null,
                    balance: 0,
                    status: 'UNINITIALIZED',
                }),
        }),
        {
            name: 'sui-wallet',
        },
    ),
)

export default useVaultStore
