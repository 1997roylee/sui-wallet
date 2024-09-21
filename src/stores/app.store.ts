import { getClient } from '@/utils/sui-client'
import { SuiClient } from '@mysten/sui/dist/cjs/client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type Network = 'mainnet' | 'testnet' | 'devnet' | 'localnet'

export interface AppState {
    initialized: boolean
    setInitialized: (initialized: boolean) => void
    authenticated: boolean
    setAuthenticated: (authenticated: boolean) => void
    walletId: string | null
    setWalletId: (walletId: string | null) => void
    accountId: number | null
    setAccountId: (accountId: number | null) => void
    networkId: Network
    setNetworkId: (networkId: Network) => void
    client: SuiClient
    setClient: (client: SuiClient) => void
}

export const useAppState = create(
    persist<AppState>(
        set => ({
            initialized: false,
            setInitialized: initialized => set({ initialized }),
            authenticated: false,
            setAuthenticated: authenticated => set({ authenticated }),
            walletId: null,
            setWalletId: walletId => set({ walletId }),
            accountId: null,
            setAccountId: accountId => set({ accountId }),
            networkId: 'devnet',
            setNetworkId: networkId => set({ networkId }),
            client: getClient(),
            setClient: client => set({ client }),
        }),
        {
            name: 'sui-app',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)

export function login(walletId: string, accountId: number) {
    useAppState.getState().setInitialized(true)
    useAppState.getState().setAuthenticated(true)
    useAppState.getState().setWalletId(walletId)
    useAppState.getState().setAccountId(accountId)
    useAppState.getState().setClient(getClient())
    // useAppState.getState().setNetworkId(networkId)
}

export function useClient() {
    return useAppState(state => state.client)
}
