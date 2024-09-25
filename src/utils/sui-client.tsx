import { getFullnodeUrl, SuiClient } from '@mysten/sui/client'

export function getClient(
    network: 'mainnet' | 'testnet' | 'devnet' | 'localnet',
) {
    const client = new SuiClient({ url: getFullnodeUrl(network) })
    // console.log('client', client)
    return client
}
