import { PropsWithChildren, useEffect } from 'react'
import { useConnection } from './connection-provider'
import { useAppState, useClient } from '@/stores/app.store'
import { getWalletCommand } from '@/scripts/background/commands'
import { Wallet } from '@/utils/core/wallet'
import useWalletState from '@/stores/wallet.store'
import useBalances from '@/hooks/use-balances'
import { useCoinPrices } from '@/hooks/use-coin-price'
import { useCoinMetadataList } from '@/hooks/use-coin-metadata'

export default function WalletProvider({ children }: PropsWithChildren) {
    const connection = useConnection()
    const { walletId, initialized, authenticated } = useAppState()
    const {
        address,
        setAddress,
        setBalances,
        setCoinPrices,
        setCoinMetadataList,
    } = useWalletState()
    const { data: balances, isLoading } = useBalances(address)
    const { data: coinPricesResult, isFetched: isCoinPricesFetched } =
        useCoinPrices(
            balances?.map(balance => balance.coinType),
            {
                refetchInterval: 1000 * 10,
            },
        )

    const {
        data: coinMetadataListResult,
        isFetched: isCoinMetadataListFetched,
    } = useCoinMetadataList(balances?.map(balance => balance.coinType) || [])

    useEffect(() => {
        if (!initialized || !authenticated) return
        ;(async () => {
            const wallet = (await connection?.send(
                getWalletCommand(walletId),
            )) as Wallet
            setAddress(wallet.address)
        })()
    }, [initialized, authenticated, walletId])

    useEffect(() => {
        if (balances?.length) {
            setBalances(balances)
        }
    }, [balances])

    useEffect(() => {
        if (
            isCoinPricesFetched &&
            coinPricesResult.some(_coinPrice => _coinPrice.isSuccess)
        ) {
            setCoinPrices(
                coinPricesResult
                    .filter(_coinPrice => _coinPrice.isSuccess)
                    .map(_coinPrice => _coinPrice.data),
            )
        }
    }, [isCoinPricesFetched, coinPricesResult.length])

    useEffect(() => {
        if (
            isCoinMetadataListFetched &&
            coinMetadataListResult.some(
                _coinMetadata => _coinMetadata.isSuccess,
            )
        ) {
            setCoinMetadataList(
                coinMetadataListResult
                    .filter(_coinMetadata => _coinMetadata.isSuccess)
                    .map(_coinMetadata => _coinMetadata.data),
            )
        }
    }, [isCoinMetadataListFetched, coinMetadataListResult.length])

    return <>{children}</>
}
