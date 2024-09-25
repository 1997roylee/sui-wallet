import { Auth } from '@/utils/core/auth'
import { commands } from './commands'
import { IndexedDBStorage } from './db'
import Port from './utils/port'
import { getMetaStorage } from '@/utils/core/storages/meta-storage'

export default class ApiProxy {
    #ports: Port[] = []
    protected db: IDBDatabase | null = null
    protected auth: Auth | null = null

    constructor() {
        this.#registerCommands()
    }

    async #registerCommands() {
        this.db = await IndexedDBStorage.createConnection()
        this.auth = new Auth(getMetaStorage(this.db)!)
    }

    public connect(port: Port) {
        this.#ports.push(port)
        console.log('Connected to port', port, this.#ports)
        commands.forEach(command => {
            console.log(this.db, this.auth);
            try {
                port.on(command.name, async data => {
                    const result = await command.callback({
                        auth: this.auth,
                        data,
                        db: this.db,
                    })
                    port.send(command.name, result)
                })
            } catch (error) {
                console.error('Error in command', command.name, error)
            }
        })

        port.onDisconnect.addListener(() => {
            this.disconnect(port)
        })
    }

    public disconnect(port: Port) {
        this.#ports = this.#ports.filter(p => p !== port)
    }
}
