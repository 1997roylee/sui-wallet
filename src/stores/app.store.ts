import { getClient } from '@/utils/sui-client'
import { SuiClient } from '@mysten/sui/dist/cjs/client'
import { useMemo } from 'react'
import { create } from 'zustand'
import { PersistStorage, persist } from 'zustand/middleware'
import superjson from 'superjson'
import { SuiGraphQLClient } from '@mysten/sui/dist/cjs/graphql/client'

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
    gqlClient: SuiGraphQLClient
    setGqlClient: (client: SuiGraphQLClient) => void
    getIsAuthenticated: () => boolean
}

const storage: PersistStorage<AppState> = {
    getItem: async (key: string) => {
        const results = await chrome.storage.local.get(key)

        if (results?.[key] === undefined) {
            return null
        }

        return superjson.parse(results?.[key])
    },
    setItem: async (key: string, value: any) => {
        console.log('setItem', key, value)
        await chrome.storage.local.set({ [key]: superjson.stringify(value) })
    },
    removeItem: async (key: string): Promise<void> => {
        console.log('removeItem', key)
        await chrome.storage.local.remove(key)
    },
}

export const useAppState = create(
    persist<AppState>(
        (set, get) => ({
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
            client: getClient('devnet'),
            setClient: client => set({ client }),
            gqlClient: new SuiGraphQLClient({
                url: 'https://api.devnet.sui.network/graphql',
            }),
            setGqlClient: gqlClient => set({ gqlClient }),
            getIsAuthenticated: () => get().authenticated && get().initialized,
        }),
        {
            name: 'sui-app',
            storage: storage,
        },
    ),
)

export function login(walletId: string, accountId: number) {
    useAppState.getState().setInitialized(true)
    useAppState.getState().setAuthenticated(true)
    useAppState.getState().setWalletId(walletId)
    useAppState.getState().setAccountId(accountId)
    useAppState.getState().setNetworkId('devnet')
    useAppState.getState().setClient(getClient('devnet'))
    useAppState.getState().setGqlClient(
        new SuiGraphQLClient({
            url: 'https://api.devnet.sui.network/graphql',
        }),
    )
}

export function useClient() {
    const networkId = useAppState(state => state.networkId)

    const client = useMemo(() => getClient(networkId), [])

    return client
}
