import { BlockAPI } from './block'

export interface BlockChainAPI {
    acceptBlock(block: BlockAPI): void

    verifyChain(): void
}
