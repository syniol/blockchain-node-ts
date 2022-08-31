export class BlockHash {
    public constructor(hash: string) {
        if (hash.length < 128) {
            throw new Error('')
        }

        if (hash.length > 600) {
            throw new Error('')
        }
    }
}
