import { PropsWithChildren } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/compoennts/ui/button'
import useStepState from '@/stores/step.store'

export default function OnboardingLayout({
    children,
    showStep = true,
}: PropsWithChildren & { showStep?: boolean }) {
    const { step } = useStepState()

    return (
        <div className="flex flex-col">
            {showStep && (
                <div className="p-3 flex items-center">
                    <div className="flex-1">
                        <Button size="icon" variant="ghost">
                            <ArrowLeft />
                        </Button>
                    </div>
                    <div className="flex-1 flex justify-center">{step}/4</div>
                    <div className="flex-1"></div>
                </div>
            )}
            <div className="flex flex-1 gap-3 flex-col p-3">{children}</div>
        </div>
    )
}
