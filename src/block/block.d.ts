export declare interface Block {
    blockNumber: number
    createdDateTime: string
    blockHash: string
    previousBlockHash: string
    nextBlock: Block

    calculateBlockHash(previousBlockHash: string)
    setBlockHash(block: Block): void
    isValidChain(previousBlockHash: string, verbose: boolean): boolean
}

export declare interface BlockChain {
    acceptBlock(block: Block): void
    verifyChain(): void
}
