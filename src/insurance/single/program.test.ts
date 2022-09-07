import { BlockChain } from './blockchain'
import { Block } from './block'
import { ClaimType } from './claim-type'

describe('Single Transaction Blockchain Specs', () => {
    const sut: BlockChain = new BlockChain()

    const block1 = new Block(
        0,
        'ABC123',
        1000.0,
        new Date(),
        'QWE123',
        10000,
        ClaimType.TotalLoss,
        undefined,
    )
    const block2 = new Block(
        1,
        'VBG345',
        2000.0,
        new Date(),
        'JKH567',
        20000,
        ClaimType.TotalLoss,
        block1,
    )
    const block3 = new Block(
        2,
        'XCF234',
        3000.0,
        new Date(),
        'DH23ED',
        30000,
        ClaimType.TotalLoss,
        block2,
    )
    const block4 = new Block(
        3,
        'CBHD45',
        4000.0,
        new Date(),
        'DH34K6',
        40000,
        ClaimType.TotalLoss,
        block3,
    )
    const block5 = new Block(
        4,
        'AJD345',
        5000.0,
        new Date(),
        '28FNF4',
        50000,
        ClaimType.TotalLoss,
        block4,
    )
    const block6 = new Block(
        5,
        'QAX367',
        6000.0,
        new Date(),
        'FJK676',
        60000,
        ClaimType.TotalLoss,
        block5,
    )
    const block7 = new Block(
        6,
        'CGO444',
        7000.0,
        new Date(),
        'LKU234',
        70000,
        ClaimType.TotalLoss,
        block6,
    )
    const block8 = new Block(
        7,
        'PLO254',
        8000.0,
        new Date(),
        'VBN456',
        80000,
        ClaimType.TotalLoss,
        block7,
    )

    sut.acceptBlock(block1)
    sut.acceptBlock(block2)
    sut.acceptBlock(block3)
    sut.acceptBlock(block4)
    sut.acceptBlock(block5)
    sut.acceptBlock(block6)
    sut.acceptBlock(block7)
    sut.acceptBlock(block8)

    it('should verify', () => {
        expect(sut.verifyChain()).toBeTruthy()
    })

    it('should NOT verify when one of blocks is compromised ', () => {
        block4.createdDate = new Date(2017, 9, 20)

        expect(sut.verifyChain()).toBeFalsy()
    })
})
