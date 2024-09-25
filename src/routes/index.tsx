import Onboard from '@/compoennts/onboard'
import Session from '@/compoennts/session'
import { withSuspence } from '@/compoennts/the-suspence'
import WalletProvider from '@/compoennts/wallet-provider'
import Error from '@/pages/error'
import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Welcome = lazy(async () => import('../pages/onboarding/welcome'))
const BackupAndDone = lazy(
    async () => import('../pages/onboarding/backup-and-done'),
)

const NewAccount = lazy(async () => import('../pages/onboarding/new-account'))
const Home = lazy(async () => import('../pages/home'))

export const routes = [
    {
        path: '/',
        element: (
            <Onboard>
                <Session>
                    <WalletProvider>
                        <Outlet />
                    </WalletProvider>
                </Session>
            </Onboard>
        ),
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace />,
            },
            {
                path: '/home',
                element: withSuspence(<Home />),
            },
        ],
    },
    {
        path: '/onboarding',
        element: <Outlet />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: withSuspence(<Welcome />),
            },
            {
                element: withSuspence(<NewAccount />),
                path: 'new-account',
            },
            {
                element: withSuspence(<BackupAndDone />),
                path: 'backup-and-done',
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/home" />,
    },
]
