export class BlockNumber extends Number {
    public constructor(value: number) {
        super(value)

        if (!Number.isInteger(value)) {
            throw new Error('only integer is allowed')
        }
    }
}
