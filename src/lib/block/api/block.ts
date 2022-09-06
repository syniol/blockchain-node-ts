export interface BlockAPI {
    calculateBlockHash(
        previousBlockHash: string | null,
    ): string
}
