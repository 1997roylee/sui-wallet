import Connection from '@/utils/core/connection'
import { createContext, useContext, useRef } from 'react'

export const ConnectionContext = createContext<Connection | null>(null)

export function ConnectionProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const connection = useRef(Connection.getInstance())
    console.log('connection', connection)
    return (
        <ConnectionContext.Provider value={connection.current}>
            {children}
        </ConnectionContext.Provider>
    )
}

export function useConnection() {
    const connection = useContext(ConnectionContext)
    return connection
}
