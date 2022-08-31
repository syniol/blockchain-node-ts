import crypto from 'crypto'

export class Hash {
    readonly #defaultAlgorithm = 'sha256'
    readonly #defaultDigestEncoding = 'hex'

    public createHash(data: crypto.BinaryLike): string {
        return crypto
            .createHash(this.#defaultAlgorithm)
            .update(data)
            .digest(this.#defaultDigestEncoding)
    }
}
