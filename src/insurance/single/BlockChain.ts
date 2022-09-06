import { Block } from './Block'

export class BlockChain {
    public CurrentBlock?: Block
    public HeadBlock?: Block

    public Blocks: Block[]

    public constructor() {
        this.Blocks = []
    }

    public AcceptBlock(block: Block): void {
        // This is the first block, so make it the genesis block.
        if (!this.HeadBlock) {
            this.HeadBlock = block
            this.HeadBlock.PreviousBlockHash = undefined
        }

        this.CurrentBlock = block
        this.Blocks.push(block)
    }

    public VerifyChain(): boolean {
        if (!this.HeadBlock) {
            throw new Error('Genesis block not set.')
        }

        let isValid = this.HeadBlock.IsValidChain(
            undefined,
            true,
        )

        if (isValid) {
            console.log('Blockchain integrity intact.')
        } else {
            console.log('Blockchain integrity NOT intact.')
        }

        return isValid
    }
}
