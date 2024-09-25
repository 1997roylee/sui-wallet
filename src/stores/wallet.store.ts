import { CoinMetadataWithCoinType } from '@/constants/coins'
import { CoinPrice } from '@/hooks/use-coin-price'
import { CoinBalance } from '@mysten/sui/dist/cjs/client'
import { create } from 'zustand'

export interface WalletState {
    address: string
    setAddress: (address: string) => void
    balances: CoinBalance[]
    setBalances: (balances: CoinBalance[]) => void
    coinPrices: CoinPrice[]
    setCoinPrices: (coinPrices: CoinPrice[]) => void
    getCoinPrice: (coinType: string) => number | undefined
    coinMetadataList: CoinMetadataWithCoinType[]
    setCoinMetadataList: (coinMetadataList: CoinMetadataWithCoinType[]) => void
    getCoinMetadata: (coinType: string) => CoinMetadataWithCoinType | undefined
}

export const useWalletState = create<WalletState>((set, get) => ({
    address: '',
    setAddress: address => set({ address }),
    balances: [],
    setBalances: balances => set({ balances }),
    coinPrices: [],
    setCoinPrices: coinPrices => set({ coinPrices }),
    getCoinPrice: (coinType: string) => {
        const coinPrice = get().coinPrices.find(
            coinPrice => coinPrice.coinType === coinType,
        )
        return coinPrice?.price
    },
    coinMetadataList: [],
    setCoinMetadataList: coinMetadataList => set({ coinMetadataList }),
    getCoinMetadata: coinType => {
        const coinMetadata = get().coinMetadataList.find(
            coinMetadata => coinMetadata.coinType === coinType,
        )
        return coinMetadata
    },
}))

export default useWalletState
