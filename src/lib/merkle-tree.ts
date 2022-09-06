import MerkleTree from 'merkle-tools'

export class Tree extends MerkleTree {
    public static get defaultHashType() {
        return 'SHA256'
    }

    public constructor() {
        super({ hashType: Tree.defaultHashType })
    }

    public build(): void {
        return this.makeTree()
    }
}
