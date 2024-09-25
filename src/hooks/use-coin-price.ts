import {
    useQueries,
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from '@tanstack/react-query'

import axios from 'axios'

export function getCoinPrice(coin: string) {
    return axios.get(`https://apps-backend.sui.io/cetus/${coin}`)
}

export type CoinPrice = {
    price: number
    coinType: string
}

export function useCoinPrices(
    coins = ['0x2::sui::SUI'],
    options?: Pick<
        UseQueryOptions<CoinPrice[]>,
        | 'refetchInterval'
        | 'refetchIntervalInBackground'
        | 'refetchOnReconnect'
        | 'enabled'
    >,
) {
    const result = useQueries<CoinPrice[], UseQueryResult<CoinPrice>[]>({
        queries: coins.map(coin => ({
            queryKey: [coin, 'price'],
            queryFn: async () => {
                const response = await getCoinPrice(coin)
                console.log(response)
                return {
                    price: (response.data?.price as number) ?? 0,
                    coinType: coin,
                } as CoinPrice
            },
            initialData: {
                price: 0,
                coinType: coin,

                // status: 'IDLE',
            },
        })),
        ...options,
    })

    return {
        data: result,
        isAllSuccess: result.every(_coinPrice => _coinPrice.isSuccess),
        isError: result.some(_coinPrice => _coinPrice.isError),
        isFetched: result.every(_coinPrice => _coinPrice.isFetched),
    }
}

export default function useCoinPrice(
    coin = '0x2::sui::SUI',
    options?: Pick<
        UseQueryOptions<number>,
        | 'refetchInterval'
        | 'refetchIntervalInBackground'
        | 'refetchOnReconnect'
        | 'enabled'
    >,
) {
    return useQuery<number>({
        queryKey: [coin, 'price'],
        queryFn: async () => {
            const response = await getCoinPrice(coin)
            return response.data?.price
        },
        initialData: 0,
        ...options,
    })
}
