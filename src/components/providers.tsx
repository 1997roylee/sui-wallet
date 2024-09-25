import { PropsWithChildren } from 'react'
import { ConnectionProvider } from './connection-provider'
// import {
//     ApolloClient,
//     InMemoryCache,
//     ApolloProvider,
//     gql,
// } from '@apollo/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { useAppState } from '@/stores/app.store'

const queryClient = new QueryClient({})

export default function Providers({ children }: PropsWithChildren) {
    // const { networkId } = useAppState()

    // const apolloClient = useMemo(
    //     () =>
    //         new ApolloClient({
    //             uri: 'https://api.devnet.sui.network/graphql',
    //             cache: new InMemoryCache(),
    //         }),
    //     [networkId],
    // )
    return (
        <ConnectionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ConnectionProvider>
    )
}
