import { useClient } from '@/stores/app.store'
import { useQuery } from '@tanstack/react-query'
import { isValidSuiAddress } from '@mysten/sui/utils'

export default function useBalances(owner: string) {
    const client = useClient()

    return useQuery({
        queryKey: [owner, 'coins'],
        queryFn: async () => {
            const balances = await client.getAllBalances({
                owner,
            })
            return balances
        },
        enabled: !!owner && isValidSuiAddress(owner),
        gcTime: 60 * 1000,
    })
}
