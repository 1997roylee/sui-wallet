import HomeLayout from '@/layouts/home'
import Health from './components/health'
import AppHeader from '@/compoennts/app/app-header'
import MyCoinsList from './components/my-coins-list'
import { useAppState, useClient } from '@/stores/app.store'
import { useEffect } from 'react'
import { useConnection } from '@/compoennts/connection-provider'
import { getWalletCommand } from '@/scripts/background/commands'
import { Wallet } from '@/utils/core/wallet'

export default function Page() {
    const connection = useConnection()
    const { walletId } = useAppState()
    const client = useClient()

    //    useEffect(()=>{
    //     client?.getCoins()
    //    },[])

    useEffect(() => {
        ;(async () => {
            const wallet = (await connection?.send(
                getWalletCommand(walletId),
            )) as Wallet

            console.log('wallet', wallet)
            const coins = await client.getAllCoins({
                owner: wallet.address,
            })
            console.log('wallet', wallet, coins)
        })()
    }, [])
    console.log('walletId', walletId)

    return (
        <HomeLayout>
            <AppHeader />
            <div>
                <Health>
                    <div className="py-3 flex justify-center items-center flex-col">
                        <p className="text-3xl font-medium">$1,000.00</p>
                    </div>
                </Health>
            </div>
            <div className="grid grid-cols-4">
                <div className="flex flex-col">qrcode</div>
                <div className="flex flex-col">send</div>
                <div className="flex flex-col">swap</div>
                <div className="flex flex-col">stake</div>
            </div>
            <MyCoinsList />
        </HomeLayout>
    )
}
