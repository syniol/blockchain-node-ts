import { UUID } from './uuid'

describe('UUID Specs', () => {
    let sut: UUID

    let firstUUID: string

    beforeAll(() => {
        sut = new UUID()
        firstUUID = sut.toString()
    })

    it('should return a UUID value when `toString` method is called', () => {
        expect(firstUUID).toHaveLength(36)
    })

    it('should return a new UUID when re-instantiated', () => {
        sut = new UUID()
        expect(sut.toString()).not.toEqual(firstUUID)
    })
})
