import { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren) {
    return <div className="flex-col flex">{children}</div>
}
