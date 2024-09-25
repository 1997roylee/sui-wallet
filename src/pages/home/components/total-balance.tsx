import useWalletState from '@/stores/wallet.store'
import { useMemo } from 'react'

export default function TotalBalance() {
    const { balances, getCoinMetadata, coinPrices } = useWalletState()

    const totalBalance = useMemo(() => {
        return balances.reduce((acc, balance) => {
            const metadata = getCoinMetadata(balance.coinType)
            const coinPrice =
                coinPrices.find(
                    coinPrice => coinPrice.coinType === balance.coinType,
                )?.price || 0
            const balanceValue =
                Number(balance.totalBalance) / 10 ** (metadata?.decimals || 9)
            return acc + coinPrice * balanceValue
        }, 0)
    }, [balances, coinPrices])

    return <>${totalBalance.toFixed(2)}</>
}
