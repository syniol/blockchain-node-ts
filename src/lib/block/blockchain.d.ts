import { BlockAPI } from './block'

export declare interface BlockChainAPI {
    acceptBlock(block: BlockAPI): void

    verifyChain(): boolean
}
