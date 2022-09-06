import { Block } from './block'

export class BlockChain {
    public currentBlock?: Block
    public headBlock?: Block

    public blocks: Block[]

    public constructor() {
        this.blocks = []
    }

    public AcceptBlock(block: Block): void {
        // This is the first block, so make it the genesis block.
        if (!this.headBlock) {
            this.headBlock = block
            this.headBlock.previousBlockHash = undefined
        }

        this.currentBlock = block
        this.blocks.push(block)
    }

    public VerifyChain(): boolean {
        if (!this.headBlock) {
            throw new Error('Genesis block not set.')
        }

        let isValid = this.headBlock.IsValidChain(
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
