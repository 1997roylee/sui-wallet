import { create } from 'zustand'

export interface TokenPair {
    id: string
    baseToken: string
    quoteToken: string
    price: number
}

export interface PriceStore {
    tokenPairs: TokenPair[]
    addTokenPair: (pair: TokenPair) => void
    updatePrice: (id: string, newPrice: number) => void
    getTokenPairPrice: (id: string) => number | undefined
}

export const usePriceStore = create<PriceStore>((set, get) => ({
    tokenPairs: [],

    addTokenPair: pair =>
        set(state => ({
            tokenPairs: [...state.tokenPairs, pair],
        })),

    updatePrice: (id, newPrice) =>
        set(state => ({
            tokenPairs: state.tokenPairs.map(pair =>
                pair.id === id ? { ...pair, price: newPrice } : pair,
            ),
        })),

    getTokenPairPrice: id => {
        const pair = get().tokenPairs.find(pair => pair.id === id)
        return pair?.price
    },
}))
