import { Tree } from './merkle-tree'
import crypto from 'crypto'

describe('Tree (Merkle Tree) Specs', () => {
    let sut: Tree

    describe('given no leaf is added to the tree; when MerkleRoot requested', () => {
        beforeAll(() => {
            sut = new Tree()

            sut.build()
        })

        it('should be null', () => {
            expect(sut.getMerkleRoot()).toBeNull()
        })
    })

    describe('given only one leaf is added to the tree; when MerkleRoot requested', () => {
        beforeAll(() => {
            sut = new Tree()

            sut.addLeaf('some value', true)

            sut.build()
        })

        it('should create buffer output', () => {
            expect(
                sut.getMerkleRoot()!.toString('base64'),
            ).toEqual(
                'qz0H8xacy9DtbEtF3iFRn5+TjHLSQSSZiquUnOg7tRs=',
            )
        })
    })

    describe('given few leafs added to the tree; when MerkleRoot requested', () => {
        beforeAll(() => {
            sut = new Tree()

            for (let i = 0; i < 12; i++) {
                sut.addLeaf(
                    crypto
                        .createHash('SHA256')
                        .update(`MockLeaf${i}`)
                        .digest()
                        .toString('hex'),
                    false,
                )

                sut.build()
            }
        })

        it('should create buffer output', () => {
            expect(
                sut.getMerkleRoot()!.toString('base64'),
            ).toEqual(
                'gdmiYRp4i3QyW/yHUq9xEvGC6hD1HXelvci8gFleizE=',
            )
        })
    })
})
