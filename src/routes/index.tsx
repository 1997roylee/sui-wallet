import { withSuspence } from '@/compoennts/the-suspence'
import Error from '@/pages/error'
import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Welcome = lazy(async () => import('../pages/onboarding/welcome'))
const BackupAndDone = lazy(
    async () => import('../pages/onboarding/backup-and-done'),
)

const NewAccount = lazy(async () => import('../pages/onboarding/new-account'))

export const routes = [
    {
        path: '/',
        element: (
            <div>
                <Outlet />
            </div>
        ),
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Navigate to="/onboarding" replace />,
            },
        ],
    },
    {
        path: '/home',
        element: withSuspence(<Welcome />),
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
        element: <Navigate to="/onboarding" />,
    },
]
