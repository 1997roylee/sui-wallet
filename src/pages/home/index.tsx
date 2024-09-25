import HomeLayout from '@/layouts/home'
import Health from './components/health'
import AppHeader from '@/components/app/app-header'
import MyCoinsList from './components/my-coins-list'
import { useAppState, useClient } from '@/stores/app.store'
import { useEffect } from 'react'
import { useConnection } from '@/components/connection-provider'
import { Button } from '@/components/ui/button'
import useWalletState from '@/stores/wallet.store'
import { formatAddress } from '@mysten/sui/dist/cjs/utils'
import { LuCopy } from 'react-icons/lu'
import copy from 'copy-to-clipboard'
import TotalBalance from './components/total-balance'
import {
    LuArrowUp,
    LuArrowDown,
    LuArrowLeftRight,
    LuDollarSign,
} from 'react-icons/lu'

export default function Page() {
    const { address } = useWalletState()

    const handleCopyAddress = () => {
        copy(address)
    }

    return (
        <HomeLayout className="flex flex-col gap-3" header={<AppHeader />}>
            <div>
                <>
                    <div className="py-3 flex justify-center items-center flex-col">
                        <p className="text-5xl">
                            <TotalBalance />
                        </p>
                        <div
                            className="gap-3 flex items-center cursor-pointer"
                            onClick={handleCopyAddress}
                        >
                            <div>{formatAddress(address)}</div>
                            <LuCopy />
                        </div>
                    </div>
                </>
            </div>
            <div className="flex justify-around mx-3 border-b pb-6 border-gray-100">
                <div className="flex flex-col items-center gap-1">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                    >
                        <LuArrowUp />
                    </Button>
                    <p>Send</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                    >
                        <LuArrowDown />
                    </Button>
                    <p>Receive</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                    >
                        <LuArrowLeftRight />
                    </Button>
                    <p>Swap</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                    >
                        <LuDollarSign />
                    </Button>
                    <p>Earn</p>
                </div>

                {/* <div className="flex flex-col">
                    <Button>stake</Button>
                </div> */}
            </div>

            <div>
                <p className="mx-3">Crypto</p>
                <MyCoinsList />
            </div>
        </HomeLayout>
    )
}
