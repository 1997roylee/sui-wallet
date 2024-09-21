import { PropsWithChildren } from 'react'

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-w-[360px] min-h-[600px] flex flex-col max-w-md bg-white h-full sm:shadow-2xl sm:rounded-lg">
            {children}
        </div>
    )
}
