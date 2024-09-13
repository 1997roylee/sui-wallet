// import VaultWallet from '@/services/super-wallet'
// import { useEffect } from 'react'

import { Button } from '@/compoennts/ui/button'
import { Link } from 'react-router-dom'

export default function Page() {
    // useEffect(() => {
    //     ;(async () => {
    //         const mneonic = await VaultWallet.generateWalletMnemonic()
    //     })()
    // }, [])

    return (
        <div className="flex flex-col">
            <div className="flex-1">
                <p>Sui Wallet</p>
                <p>A friendly Sui wallet built for DeFi, NFTs & Gamefi</p>
            </div>
            <div className="flex flex-col gap-3">
                <Link to="/onboarding/new-account">
                    <Button>Create a new wallet</Button>
                </Link>
                <Button>I already have a wallet</Button>
                {/* <Button>Open New Account</Button> */}
            </div>
        </div>
    )
}
