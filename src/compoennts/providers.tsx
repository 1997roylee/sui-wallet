import { PropsWithChildren } from 'react'
import { ConnectionProvider } from './connection-provider'
// import { isBrowser } from '@/utils/platform'

export default function Providers({ children }: PropsWithChildren) {
    // if (isBrowser()) {
    //     return <>{children}</>
    // }
    return <ConnectionProvider>{children}</ConnectionProvider>
}
