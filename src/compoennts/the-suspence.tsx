import { PropsWithChildren, ReactNode, Suspense } from 'react'

const FullPageLoading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
            <div className="text-white">Loading...</div>
        </div>
    )
}

const TheSuspense = (props: PropsWithChildren) => {
    return <Suspense fallback={<FullPageLoading />}>{props.children}</Suspense>
}

export const withSuspence = (children: ReactNode) => {
    return <TheSuspense>{children}</TheSuspense>
}

export default TheSuspense
