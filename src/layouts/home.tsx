import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

export default function HomeLayout({
    children,
    className,
    header,
}: PropsWithChildren & { className?: string; header?: React.ReactNode }) {
    return (
        <>
            <div className={cn('flex flex-col min-h-screen')}>
                {header}
                <main className={cn('flex-1', className)}>{children}</main>
            </div>
        </>
    )
}
