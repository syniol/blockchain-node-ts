export abstract class BlockHeader {
    protected constructor(
        public blockNumber: number,
        public createdDateTime: string,
        public blockHash: string,
        public previousBlockHash: string,
        public nextBlock: BlockHeader,
    ) {}

    public abstract calculateBlockHash(previousBlockHash: string): void
    public abstract setBlockHash(block: BlockHeader): void
    public abstract isValidChain(
        previousBlockHash: string,
        verbose: boolean,
    ): boolean
}
