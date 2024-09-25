// export type CoinMetadata = {
//     coinType: string
//     name: string
//     symbol: string
//     decimals: number
//     iconUrl: string

import { CoinMetadata } from '@mysten/sui/dist/cjs/client'

export type CoinMetadataWithCoinType = CoinMetadata & { coinType: string }
export const COINS: CoinMetadataWithCoinType[] = [
    {
        coinType: '0x2::sui::SUI',
        name: 'Sui',
        symbol: 'SUI',
        decimals: 9,
        description: 'Sui Coin',
        iconUrl:
            'https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/sui-coin.svg/public',
    },
]

// USDC
// https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/usdc.png/public

// USDT
// https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/usdt.png/public

// CETUS
// https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/cetus.jpeg/public
