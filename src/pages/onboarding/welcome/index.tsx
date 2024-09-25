import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import OnboardingLayout from '@/layouts/onboarding'
import { Link } from 'react-router-dom'

export default function Page() {
    return (
        <OnboardingLayout showStep={false} className="flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <Heading align="center" size="h1">
                    Sui Wallet
                </Heading>
                <Heading align="center">
                    A friendly Sui wallet built for DeFi, NFTs & Gamefi
                </Heading>
            </div>
            <div className="flex flex-col gap-3">
                <Link to="/onboarding/new-account" className="w-full">
                    <Button size="lg" className="w-full">
                        Create a new wallet
                    </Button>
                </Link>
                <Link to="/onboarding/new-account" className="w-full">
                    <Button size="lg" className="w-full" variant="outline">
                        Create a new wallet
                    </Button>
                </Link>
            </div>
        </OnboardingLayout>
    )
}
