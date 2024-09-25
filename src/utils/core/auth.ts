import Session from './session'
import { password2Token, newToken } from './utils'
import * as crypto from './crypto'
import { MetaStorage } from './storages/meta-storage'
import CryptoJS from 'crypto-js'

export async function validateAuthToken(storage: MetaStorage, token: string) {
    const meta = await storage.loadMeta()

    if (!meta) {
        throw new Error('Meta not found')
    }

    return crypto.validateToken(token, meta.cipher)
}

export class Auth {
    #storage: MetaStorage
    readonly #session: Session
    constructor(storage: MetaStorage) {
        this.#session = new Session()
        this.#storage = storage
    }

    public async initPassword(password: string) {
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters')
        }

        const { cipher } = newToken(password)
        const meta = {
            walletId: 1,
            walletVersion: 1,
            cipher,
        }

        await this.#storage.reset()
        await this.#storage.saveMeta(meta)
        await this.login(password)
        return true
    }

    public async verifyPassword(password: string) {
        // const newToken = await this.createTokenByPassword(password)

        const meta = await this.#storage.loadMeta()

        if (!meta) {
            throw new Error('Meta not found')
        }

        const salt = CryptoJS.enc.Hex.parse(meta.cipher.salt)

        const token = password2Token(password, salt)

        if (!crypto.validateToken(token.toString(), meta.cipher)) {
            throw new Error('Invalid password')
        }

        this.login(password)
        return token.toString()
        // return (await this.#session.getToken()) === token.toString()
    }

    // public async logout() {
    //     this.session.clearToken();
    //   }

    public async login(password: string) {
        const token = await this.createTokenByPassword(password)
        this.#session.setToken(token.toString())
    }

    public async getToken() {
        return this.#session.getToken()
    }

    public async getIsAuthorized() {
        console.log('session', this.#session)
        return this.#session.isAuthorized
    }

    public async createTokenByPassword(password: string) {
        const meta = await this.#storage.loadMeta()

        if (!meta) {
            throw new Error('Meta not found')
        }

        const salt = CryptoJS.enc.Hex.parse(meta.cipher.salt)

        const token = password2Token(password, salt)

        console.log("token", token.toString())
        if (!crypto.validateToken(token.toString(), meta.cipher))
            throw new Error('Invalid password')

        return token
    }
}
