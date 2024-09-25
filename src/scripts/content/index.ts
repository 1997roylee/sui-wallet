// For Inject Wallet

import KeepAliveConnection from '../background/connections/KeepAliveConnection'

;(function main() {
    const keepAlive = new KeepAliveConnection('CONTENT_SCRIPT')
    keepAlive.connect()
})()
