import { CoinMetadataWithCoinType, COINS } from '@/constants/coins'
import { useClient } from '@/stores/app.store'
import { SuiClient } from '@mysten/sui/dist/cjs/client'
import { useQueries, useQuery } from '@tanstack/react-query'

export async function getCoinMetadata(client: SuiClient, coinType: string) {
    const coin = COINS.find(coin => coin.coinType === coinType)

    if (coin) return coin
    const metadata = await client.getCoinMetadata({
        coinType: coinType,
    })
    return {
        ...metadata,
        coinType,
    } as CoinMetadataWithCoinType
}

export function useCoinMetadataList(coinTypes: string[]) {
    const client = useClient()

    const result = useQueries({
        queries: coinTypes.map(coinType => ({
            queryKey: [coinType, 'metadata'],
            queryFn: async () => {
                return getCoinMetadata(client, coinType)
            },
            gcTime: Infinity,
        })),
    })

    return {
        data: result,
        isAllSuccess: result.every(_coinMetadata => _coinMetadata.isSuccess),
        isError: result.some(_coinMetadata => _coinMetadata.isError),
        isFetched: result.every(_coinMetadata => _coinMetadata.isFetched),
    }
}

export default function useCoinMetadata(coinType: string) {
    const client = useClient()

    return useQuery({
        queryKey: [coinType, 'metadata'],
        queryFn: async () => {
            return getCoinMetadata(client, coinType)
        },
        gcTime: Infinity,
    })
}
