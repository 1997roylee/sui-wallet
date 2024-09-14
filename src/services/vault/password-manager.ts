export class PasswordManager {
    public static async encrypt(password: string, key: CryptoKey) {
        const encoder = new TextEncoder()
        const data = encoder.encode(password)
        const iv = window.crypto.getRandomValues(new Uint8Array(12))

        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            key,
            data,
        )

        return {
            iv: Array.from(iv),
            encryptedData: Array.from(new Uint8Array(encryptedData)),
        }
    }
}
