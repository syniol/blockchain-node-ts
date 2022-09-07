import { ClaimType } from './claim-type'
import { Hash } from '../../lib/cryptography'
import { BlockAPI } from '../../lib/block/block'

export class Block implements BlockAPI {
    // Provided by the consumer
    public claimNumber: string
    public settlementAmount: number
    public settlementDate: Date
    public carRegistration: string
    public mileage: number
    public claimType: ClaimType

    // Set as part of the block creation process. (Block header)
    public blockNumber: number
    public createdDate: Date
    public blockHash?: string
    public previousBlockHash?: string
    public nextBlock?: Block

    public constructor(
        blockNumber: number,
        claimNumber: string,
        settlementAmount: number,
        settlementDate: Date,
        carRegistration: string,
        mileage: number,
        claimType: ClaimType,
        parent?: Block,
    ) {
        this.blockNumber = blockNumber
        this.claimNumber = claimNumber
        this.settlementAmount = settlementAmount
        this.settlementDate = settlementDate
        this.carRegistration = carRegistration
        this.mileage = mileage
        this.claimType = claimType
        this.createdDate = new Date()
        this.assignBlockHash(parent)
    }

    public calculateBlockHash(
        previousBlockHash?: string,
    ): string {
        const txnHash =
            this.claimNumber +
            this.settlementAmount +
            this.settlementDate +
            this.carRegistration +
            this.mileage +
            this.claimType

        const blockHeader =
            this.blockNumber +
            this.createdDate.toUTCString() +
            (previousBlockHash || '')
        const combined = txnHash + blockHeader

        return new Hash().createHash(combined)
    }

    public assignBlockHash(parent?: Block): void {
        if (parent) {
            this.previousBlockHash = parent.blockHash
            parent.nextBlock = this
        } else {
            // Previous block is the genesis block.
            this.previousBlockHash = undefined
        }

        this.blockHash = this.calculateBlockHash(
            this.previousBlockHash,
        )
    }

    public isValidChain(
        prevBlockHash?: string,
        verbose?: boolean,
    ): boolean {
        let isValid: boolean = true

        // Is this a valid block and transaction
        const newBlockHash =
            this.calculateBlockHash(prevBlockHash)
        if (newBlockHash !== this.blockHash) {
            isValid = false
        } else {
            isValid =
                this.previousBlockHash === prevBlockHash
        }

        this.logVerification(verbose, isValid)

        // Check the next block by passing in our newly calculated block hash.
        // This will be compared to the previous hash in the next block.
        // They should match for the chain to be valid.
        if (this.nextBlock) {
            return this.nextBlock.isValidChain(
                newBlockHash,
                verbose,
            )
        }

        return isValid
    }

    private logVerification(
        verbose?: boolean,
        isValid?: boolean,
    ): void {
        if (verbose) {
            if (!isValid) {
                console.log(
                    'Block Number ' +
                        this.blockNumber +
                        ' : FAILED VERIFICATION',
                )
            } else {
                console.log(
                    'Block Number ' +
                        this.blockNumber +
                        ' : PASSED VERIFICATION',
                )
            }
        }
    }
}
