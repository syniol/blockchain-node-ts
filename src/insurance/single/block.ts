import { ClaimType } from './claim-type'
import { Hash } from '../../lib/cryptography'

export class Block {
    // Provided by the user
    public claimNumber: string
    public settlementAmount: number
    public settlementDate: Date
    public carRegistration: string
    public mileage: number
    public claimType: ClaimType

    // Set as part of the block creation process.
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
        this.SetBlockHash(parent)
    }

    public CalculateBlockHash(
        previousBlockHash?: string,
    ): string {
        const txnHash =
            this.claimNumber +
            this.settlementAmount +
            this.settlementDate +
            this.carRegistration +
            this.mileage +
            this.claimType
        const blockheader =
            this.blockNumber +
            this.createdDate.toUTCString() +
            (previousBlockHash || '')
        const combined = txnHash + blockheader

        return new Hash().createHash(combined)
    }

    // Set the block hash
    public SetBlockHash(parent?: Block): void {
        if (parent) {
            this.previousBlockHash = parent.blockHash
            parent.nextBlock = this
        } else {
            // Previous block is the genesis block.
            this.previousBlockHash = undefined
        }

        this.blockHash = this.CalculateBlockHash(
            this.previousBlockHash,
        )
    }

    public IsValidChain(
        prevBlockHash?: string,
        verbose?: boolean,
    ): boolean {
        let isValid: boolean = true

        // Is this a valid block and transaction
        const newBlockHash =
            this.CalculateBlockHash(prevBlockHash)
        if (newBlockHash != this.blockHash) {
            isValid = false
        } else {
            isValid =
                this.previousBlockHash === prevBlockHash
        }

        this.PrintVerificationMessage(verbose, isValid)

        // Check the next block by passing in our newly calculated blockhash. This will be compared to the previous
        // hash in the next block. They should match for the chain to be valid.
        if (this.nextBlock != null) {
            return this.nextBlock.IsValidChain(
                newBlockHash,
                verbose,
            )
        }

        return isValid
    }

    private PrintVerificationMessage(
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
                        ' : PASS VERIFICATION',
                )
            }
        }
    }
}
