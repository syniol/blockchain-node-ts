import crypto from 'crypto'

export class DigitalSignature {
    readonly #algorithm = 'RSA-SHA256'
    readonly #digestEncoding = 'base64'
    readonly #privateKey: string
    readonly #publicKey: string

    public constructor(
        publicKey: string,
        privateKey: string,
    ) {
        this.#publicKey = publicKey
        this.#privateKey = privateKey
    }

    public static create() {
        if (!process.env.DS_PUB_KEY) {
            throw new Error(
                'public key is not populated in: DS_PUB_KEY',
            )
        }

        if (!process.env.DS_PRV_KEY) {
            throw new Error(
                'private key is not populated in: DS_PRV_KEY',
            )
        }

        return new DigitalSignature(
            process.env.DS_PUB_KEY,
            process.env.DS_PRV_KEY,
        )
    }

    public sign(data: crypto.BinaryLike): string {
        return crypto
            .createSign(this.#algorithm)
            .update(data)
            .sign(this.#privateKey, this.#digestEncoding)
    }

    public verify(
        data: string,
        signature: string,
    ): boolean {
        return crypto
            .createVerify(this.#algorithm)
            .update(data)
            .verify(
                this.#publicKey,
                signature,
                this.#digestEncoding,
            )
    }
}
