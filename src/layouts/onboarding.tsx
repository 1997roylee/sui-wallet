import { PropsWithChildren } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/compoennts/ui/button'
import useStepState from '@/stores/step.store'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function OnboardingLayout({
    children,
    showStep = true,
    className = '',
}: PropsWithChildren & { showStep?: boolean; className?: string }) {
    const { step } = useStepState()
    const navigate = useNavigate()

    const { prevStep } = useStepState()

    const handleBack = () => {
        navigate(-1)
        prevStep()
    }

    return (
        <div className="flex flex-col flex-1">
            {showStep && (
                <div className="p-3 flex items-center">
                    <div className="flex-1">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleBack}
                        >
                            <ArrowLeft />
                        </Button>
                    </div>
                    <div className="flex-1 flex justify-center">
                        {step + 1}/4
                    </div>
                    <div className="flex-1"></div>
                </div>
            )}
            <div className={cn('flex flex-1 gap-3 flex-col p-4', className)}>
                {children}
            </div>
        </div>
    )
}
