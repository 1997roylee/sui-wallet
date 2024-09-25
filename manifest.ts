import { defineManifest } from '@crxjs/vite-plugin'
import { description, version } from './package.json'

export default defineManifest(async env => ({
    name: env.mode === 'stagging' ? '[INTERNAL] Sui Wallet' : 'Sui Wallet',
    manifest_version: 3,
    version,
    description,
    permissions: ['storage'],
    action: {
        default_popup: 'index.html',
    },
    background: {
        service_worker: 'src/scripts/background/index.ts',
    },
    content_scripts: [
        {
            matches: ['http://*/*'],
            // matches: ['http://*/*', 'https://*/*'],
            js: ['src/scripts/content/index.ts'],
            run_at: 'document_start',
        },
    ],
    // icons: {
    //   "128": "src/assets/icons/128x128.png",
    // },
}))
