import RootLayout from '@/layouts/root'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from '@/routes'
import Providers from '@/compoennts/providers'
import '@/assets/fonts/line/font.css'

const router = createBrowserRouter(routes)

export default function Popup() {
    return (
        <Providers>
            <RootLayout>
                <RouterProvider router={router} />
            </RootLayout>
        </Providers>
    )
}
