import useWalletState from '@/stores/wallet.store'
import { CoinBalance } from '@mysten/sui/dist/cjs/client'

export interface CoinItemProps {
    coinBalance: CoinBalance
}
function CoinItem({ coinBalance }: CoinItemProps) {
    const { getCoinPrice, getCoinMetadata } = useWalletState()

    const coinPrice = getCoinPrice(coinBalance.coinType) ?? 0
    const metadata = getCoinMetadata(coinBalance.coinType)

    const totalBalance =
        Number(coinBalance.totalBalance) / 10 ** (metadata?.decimals || 9)
    return (
        <div className="flex rounded-lg hover:bg-gray-50 p-3 cursor-pointer items-center">
            <div className="flex items-center">
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center">
                        <img
                            src={metadata?.iconUrl ?? ""}
                            alt={metadata?.name}
                            className="h-full w-full"
                        />
                    </div>
                    <div>
                        <div className="font-medium">{metadata?.name}</div>
                        <div>
                            {totalBalance} {metadata?.symbol}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1"></div>
            <div className="flex">
                <div>${(coinPrice * totalBalance).toFixed(2)}</div>
            </div>
        </div>
    )
}

export default function MyCoinsList() {
    const { balances } = useWalletState()

    return (
        <div className="flex flex-col">
            {balances.map(balance => {
                return <CoinItem coinBalance={balance} key={balance.coinType} />
            })}
        </div>
    )
}
