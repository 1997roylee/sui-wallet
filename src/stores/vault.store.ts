import Vault from '@/utils/core/vault'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface VaultState {
    vault: Vault | null
    balance: number
    status: 'UNINITIALIZED' | 'INITIALIZED' | 'LOCKED' | 'UNLOCKED'
    setBalance: (balance: number) => void
    setStatus: (status: VaultState['status']) => void
    setVault: (vault: Vault) => void
    resetVault: () => void
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
