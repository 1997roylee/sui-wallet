import { PropsWithChildren } from 'react'
import { ConnectionProvider } from './connection-provider'

export default function Providers({ children }: PropsWithChildren) {
    return <ConnectionProvider>{children}</ConnectionProvider>
}
