import { Hash } from './hash'

describe('Hash Specs', () => {
    let sut: Hash

    beforeAll(() => {
        sut = new Hash()
    })

    it('should create a SHA-2 hash', () => {
        expect(sut.createHash('Syniol Limited')).toEqual(
            '10f1812884cd23a972307a1d5b7e85cae149be0e3cfd6b4d8b27f162af88a9c6',
        )
    })
    it('should create a second SHA-2 hash', () => {
        expect(sut.createHash('Hadi')).toEqual(
            'a28a45c1cac79570a2b7e72238834710b99962acc47f41b579ea4c98a5584eaf',
        )
    })
})
