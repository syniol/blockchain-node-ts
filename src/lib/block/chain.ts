import { Block } from '../../block/block'

export class BlockChain {
    public acceptBlock(block: Block): void {
        console.log(block.blockHash)
    }

    public verifyChain(): void {}
}
