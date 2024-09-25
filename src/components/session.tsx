import { PropsWithChildren, useEffect } from 'react'
import LockPage from '../pages/lock'
import { useAppState } from '@/stores/app.store'
import { useConnection } from './connection-provider'
import { getIsAuthedCommand } from '@/scripts/background/commands'

export default function Session({ children }: PropsWithChildren) {
    const { getIsAuthenticated, setAuthenticated } = useAppState()
    const connection = useConnection()

    const verifyIsAuthenticated = async () => {
        const isAuthed = await connection?.send(getIsAuthedCommand())
        console.log('isAuthed', isAuthed)
        if (!isAuthed) {
            setAuthenticated(false)
        } else {
            setAuthenticated(true)
        }
    }

    useEffect(() => {
        verifyIsAuthenticated()
    }, [])

    if (!getIsAuthenticated()) return <LockPage />

    return <>{children}</>
}
