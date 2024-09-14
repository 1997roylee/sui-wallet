import Footer from '@/compoennts/footer'
import Header from '@/compoennts/header'
import { PropsWithChildren } from 'react'

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-w-[360px] min-h-[600px] flex flex-col">
            {children}
            {/* <Header />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer /> */}
        </div>
    )
}
