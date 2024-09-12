import Footer from '@/compoennts/footer'
import Header from '@/compoennts/header'
import { PropsWithChildren } from 'react'

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <div className="w-96 h-96 flex flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
    )
}
