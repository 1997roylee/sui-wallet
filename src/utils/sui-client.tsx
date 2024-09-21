import { getFullnodeUrl, SuiClient } from '@mysten/sui/client'

export function getClient() {
    return new SuiClient({ url: getFullnodeUrl('devnet') })
}
