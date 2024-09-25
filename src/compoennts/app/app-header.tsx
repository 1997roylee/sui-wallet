import copy from 'copy-to-clipboard'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { LuCopy } from 'react-icons/lu'
import useWalletState from '@/stores/wallet.store'
import { formatAddress } from '@mysten/sui/dist/cjs/utils'
import SuiOceanLogo from '@/assets/icons/Sui_Symbol_Ocean.svg'
export default function AppHeader() {
    const { address } = useWalletState()
    const handleCopyAddress = () => {
        copy(address)
    }

    return (
        <div className="flex items-center bg-white p-3 justify-between">
            <div className="flex items-center gap-1 cursor-pointer">
                <Avatar className="bg-blue-300 font-medium">1</Avatar>
                <div>
                    <p className="text-gray-700">Account 01</p>
                    <div className="font-medium" onClick={handleCopyAddress}>
                        {formatAddress(address)}
                    </div>
                </div>
                {/* <Button size="icon" variant='ghost'>
                    <LuCopy />
                </Button> */}
            </div>
            {/* <div className="flex-1"></div> */}
            <div className="flex">
                <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    onClick={handleCopyAddress}
                >
                    <LuCopy />
                </Button>
                <Button variant="secondary" size='sm' className='rounded-full'>
                    <img
                        src={SuiOceanLogo}
                        className="w-4 h-4 bg-white rounded-full"
                        alt="SUI"
                    />
                    Mainnet
                </Button>
            </div>
        </div>
    )
}
