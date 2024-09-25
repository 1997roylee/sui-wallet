import { useConnection } from '@/components/connection-provider'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/check-box'
import { Heading } from '@/components/ui/heading'
import { Label } from '@/components/ui/label'
import OnboardingLayout from '@/layouts/onboarding'
import { cn } from '@/lib/utils'
import {
    createWalletCommand,
    revealMnemonicCommand,
} from '@/scripts/background/commands'
import { login } from '@/stores/app.store'
import { Wallet } from '@/utils/core/wallet'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BackupPhrase: React.FC<{ phrase: string }> = ({ phrase }) => {
    const [blur, setBlur] = useState(true)
    const words = phrase.split(' ')

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-3">
                {words.map((word, index) => (
                    <div
                        key={index}
                        className={cn(
                            'border bg-gray-50 px-3 py-1.5 text-lg rounded-lg flex gap-1.5',
                            blur && 'blur-sm',
                        )}
                    >
                        <span>{index + 1}.</span>
                        <span>{word}</span>
                    </div>
                ))}
            </div>
            {blur && (
                <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                    <Button onClick={() => setBlur(false)}>View</Button>
                </div>
            )}
            {/* <div className="absolute top-0 left-0 bottom-0 right-0 backdrop-blur-lg bg-opacity-50 bg-white"></div> */}
        </div>
    )
}

export default function Page() {
    const [mnemonic, setMnemonic] = useState<string | null>(null)
    const connection = useConnection()
    const navigate = useNavigate()

    const app = useRef<{
        walletId: string | null
        accountId: number | null
        networkId: number | null
    }>({
        walletId: null,
        accountId: null,
        networkId: null,
    })
    useEffect(() => {
        if (!connection) {
            throw new Error('Connection not found')
        }

        if (mnemonic) return
        ;(async () => {
            const wallet = await connection.send<Wallet>(createWalletCommand())
            // setMnemonic(wallet.keyPair.getSecretKey)
            console.log('wallet', wallet)

            const mnemonic: string = await connection.send(
                revealMnemonicCommand(wallet.encryptMnemonic),
            )
            console.log('mnemonic', mnemonic)

            setMnemonic(mnemonic)
            app.current = {
                walletId: wallet.id,
                accountId: 0,
                networkId: 0,
            }
        })()
    }, [connection])

    const handleDone = () => {
        login(
            app.current.walletId!,
            app.current.accountId!,
            app.current.networkId!,
        )
        navigate('/home')
    }

    return (
        <OnboardingLayout>
            <Heading>Your 12-Word Backup Phrase</Heading>
            <Heading align="center">
                Write these words down in order and keep them safe. Do not share
                this phrase with anyone.
            </Heading>
            {mnemonic && <BackupPhrase phrase={mnemonic} />}
            <div className="flex">
                <Checkbox id="saved" />
                <Label htmlFor="saved">I saved my backup phrase</Label>
            </div>
            <Button size="lg" onClick={handleDone}>
                Continue
            </Button>
            <Button size="lg" variant="outline">
                Copy to clipboard
            </Button>
        </OnboardingLayout>
    )
}
