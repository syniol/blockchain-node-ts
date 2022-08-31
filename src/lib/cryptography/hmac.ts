import crypto from 'crypto'

export class HMAC {
    readonly #secret: string
    readonly #defaultDigestEncoding = 'hex'
    readonly #defaultAlgorithm = 'sha256'

    public constructor(secret: string) {
        this.#secret = secret
    }

    public static create(): HMAC {
        return new HMAC(
            process.env.HMAC_SECRET || 'Syni0l9D32',
        )
    }

    public get secret(): string {
        return this.#secret
    }

    public createHash(
        data: string | NodeJS.ArrayBufferView,
    ): string {
        return crypto
            .createHmac(
                this.#defaultAlgorithm,
                this.#secret,
            )
            .update(data)
            .digest(this.#defaultDigestEncoding)
    }
}
