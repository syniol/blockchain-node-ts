import { Block } from './block'
import { BlockChainAPI } from '../../lib/block/blockchain'

export class BlockChain implements BlockChainAPI {
    public currentBlock?: Block
    public headBlock?: Block

    public readonly blocks: Block[]

    public constructor(blocks?: Block[]) {
        this.blocks = []
        if (blocks) {
            this.blocks = blocks
        }
    }

    public acceptBlock(block: Block): void {
        // This is the first block, so make it the genesis block.
        if (!this.headBlock) {
            this.headBlock = block
            this.headBlock.previousBlockHash = undefined
        }

        this.currentBlock = block
        this.blocks.push(block)
    }

    public verifyChain(): boolean {
        if (!this.headBlock) {
            throw new Error('Genesis block not set.')
        }

        let isValid = this.headBlock.isValidChain(
            undefined,
            true,
        )

        if (isValid) {
            console.log('Blockchain integrity is intact.')
        } else {
            console.log(
                'Blockchain integrity is NOT intact.',
            )
        }

        return isValid
    }
}
