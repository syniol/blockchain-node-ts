export class BlockDatetime extends Date {
    public override toString(): string {
        return this.toUTCString()
    }
}
