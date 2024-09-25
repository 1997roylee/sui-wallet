import { useAppState } from '@/stores/app.store'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

export default function Onboard({ children }: PropsWithChildren) {
    const { initialized, ...state } = useAppState()

    console.log('initialized', initialized, state)
    if (initialized) {
        return <>{children}</>
    }
    return <Navigate to="/onboarding" />
}
