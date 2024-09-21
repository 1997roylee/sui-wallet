import { DEFAULT_EXPIRATION } from './constants'

export class Session {
    #token: string | null = null
    #lastUpdated: number = 0
    #expiration: number = 0

    constructor() {
        this.#token = null
        this.setExpiration(DEFAULT_EXPIRATION)
    }

    public setToken(token: string): void {
        this.#token = token
        this.#touchLastUpdated()
    }

    public clearToken(): void {
        this.#token = null
        this.#touchLastUpdated()
    }

    public setExpiration(expiration: number) {
        if (typeof expiration !== 'number' || expiration < 0) {
            throw new Error('expiration must be greater than 0')
        }
        this.#expiration = expiration
    }

    public getToken(): string | null {
        if (this.#hasExpired()) {
            this.clearToken()
            return null
        }
        return this.#token
    }

    get isExpired(): boolean {
        return this.#hasExpired()
    }

    get isAuthorized(): boolean {
        return !!this.getToken()
    }

    #touchLastUpdated(): void {
        this.#lastUpdated = Date.now()
    }

    #hasExpired() {
        if (!this.#lastUpdated) return true
        return Date.now() > this.#lastUpdated + this.#expiration
    }
}

export default Session
