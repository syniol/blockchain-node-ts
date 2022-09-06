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

    sut.AcceptBlock(block1)
    sut.AcceptBlock(block2)
    sut.AcceptBlock(block3)
    sut.AcceptBlock(block4)
    sut.AcceptBlock(block5)
    sut.AcceptBlock(block6)
    sut.AcceptBlock(block7)
    sut.AcceptBlock(block8)

    it('should verify', function () {
        expect(sut.VerifyChain()).toBeTruthy()
    })

    it('should NOT verify', function () {
        block4.createdDate = new Date(2017, 9, 20)
        block2.createdDate = new Date(2020, 9, 20)
        expect(sut.VerifyChain()).toBeFalsy()
    })
})
