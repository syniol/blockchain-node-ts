import crypto, { BinaryToTextEncoding } from 'crypto'

export class Hash {
    readonly #defaultAlgorithm = 'sha256'
    readonly #defaultDigestEncoding = 'hex'

    public createHash(
        data: crypto.BinaryLike,
        encoding?: BinaryToTextEncoding,
    ): string {
        return crypto
            .createHash(this.#defaultAlgorithm)
            .update(data)
            .digest(encoding || this.#defaultDigestEncoding)
    }
}
