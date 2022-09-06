import { ClaimType } from './ClaimType'
import { Hash } from '../../lib/cryptography'

export class Block {
    // Provided by the user
    public ClaimNumber: string
    public SettlementAmount: number
    public SettlementDate: Date
    public CarRegistration: string
    public Mileage: number
    public ClaimType: ClaimType

    // Set as part of the block creation process.
    public BlockNumber: number
    public CreatedDate: Date
    public BlockHash?: string
    public PreviousBlockHash?: string
    public NextBlock?: Block

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
        this.BlockNumber = blockNumber
        this.ClaimNumber = claimNumber
        this.SettlementAmount = settlementAmount
        this.SettlementDate = settlementDate
        this.CarRegistration = carRegistration
        this.Mileage = mileage
        this.ClaimType = claimType
        this.CreatedDate = new Date()
        this.SetBlockHash(parent)
    }

    public CalculateBlockHash(
        previousBlockHash?: string,
    ): string {
        const txnHash =
            this.ClaimNumber +
            this.SettlementAmount +
            this.SettlementDate +
            this.CarRegistration +
            this.Mileage +
            this.ClaimType
        const blockheader =
            this.BlockNumber +
            this.CreatedDate.toUTCString() +
            (previousBlockHash || '')
        const combined = txnHash + blockheader

        return new Hash().createHash(combined)
    }

    // Set the block hash
    public SetBlockHash(parent?: Block): void {
        if (parent) {
            this.PreviousBlockHash = parent.BlockHash
            parent.NextBlock = this
        } else {
            // Previous block is the genesis block.
            this.PreviousBlockHash = undefined
        }

        this.BlockHash = this.CalculateBlockHash(
            this.PreviousBlockHash,
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
        if (newBlockHash != this.BlockHash) {
            isValid = false
        } else {
            isValid =
                this.PreviousBlockHash === prevBlockHash
        }

        this.PrintVerificationMessage(verbose, isValid)

        // Check the next block by passing in our newly calculated blockhash. This will be compared to the previous
        // hash in the next block. They should match for the chain to be valid.
        if (this.NextBlock != null) {
            return this.NextBlock.IsValidChain(
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
                        this.BlockNumber +
                        ' : FAILED VERIFICATION',
                )
            } else {
                console.log(
                    'Block Number ' +
                        this.BlockNumber +
                        ' : PASS VERIFICATION',
                )
            }
        }
    }
}
