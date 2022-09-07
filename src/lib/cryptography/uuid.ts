import { randomUUID } from 'crypto'

export class UUID {
    readonly #uuid: string

    public constructor() {
        this.#uuid = randomUUID({
            disableEntropyCache: true,
        })
    }

    public toString(): string {
        return this.#uuid
    }
}
