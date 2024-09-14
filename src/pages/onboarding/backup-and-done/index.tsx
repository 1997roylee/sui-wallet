import { useConnection } from '@/compoennts/connection-provider'
import { Button } from '@/compoennts/ui/button'
import { Checkbox } from '@/compoennts/ui/check-box'
import { Label } from '@/compoennts/ui/label'
import OnboardingLayout from '@/layouts/onboarding'
import { cn } from '@/lib/utils'
import { getWalletCommand } from '@/scripts/background/commands'
import Vault from '@/services/vault'
import React, { useEffect, useState } from 'react'

const BackupPhrase: React.FC<{ phrase: string }> = ({ phrase }) => {
    const [blur, setBlur] = useState(true)
    const words = phrase.split(' ')

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-3">
                {words.map((word, index) => (
                    <div
                        key={index}
                        className={cn('border bg-gray-50', blur && 'blur-sm')}
                    >
                        <span>{index + 1}.</span>
                        <span>{word}</span>
                    </div>
                ))}
            </div>
            {blur && (
                <div className="absolute top-0 left-0 bottom-0 right-0 ">
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
    useEffect(() => {
        console.log('connection', connection)
        if (!connection) {
            throw new Error('Connection not found')
        }

        if (mnemonic) return
        ;(async () => {
            const wallet = await connection.send<Vault>(getWalletCommand())
            // setMnemonic(wallet.keyPair.getSecretKey)
            console.log('wallet', wallet)
            setMnemonic(wallet.mnemonic)
        })()
    }, [connection])
    return (
        <OnboardingLayout>
            <h2>Your 12-Word Backup Phrase</h2>
            <p>
                Write these words down in order and keep them safe. Do not share
                this phrase with anyone.
            </p>
            {mnemonic && <BackupPhrase phrase={mnemonic} />}
           <div className="flex">
           <Checkbox id='saved'/>
           <Label htmlFor='saved'>I saved my backup phrase</Label>
           </div>
            <Button size='lg'>Continue</Button>
        </OnboardingLayout>
    )
}
