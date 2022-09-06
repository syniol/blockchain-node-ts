import { HMAC } from './hmac'

describe('Cryptography Specs', () => {
    describe('HMAC Hashing', () => {
        let sut: HMAC

        describe('given secret key is defined as env variable', () => {
            beforeAll(() => {
                sut = new HMAC('Syni0l9')
            })

            afterAll(() => {
                delete process.env.HMAC_SECRET
            })

            it('should create a hash', () => {
                expect(sut.createHash('Hadi')).toEqual(
                    'f995cc578bdb19784065f8a5a850e80db30229e5e0ff7d37d681c9ffca4a9574',
                )
            })

            it('should create a second hash with same instantiation', () => {
                expect(sut.createHash('Tajallaei')).toEqual(
                    'c12fa692b4365378e62d814e4dd066ba1725400eea262e3f37b4c3590385aa77',
                )
            })

            it('should have a secret value with a length of 7', () => {
                expect(sut.secret).toHaveLength(7)
            })
        })

        describe('given secret key is not defined as env variable', () => {
            beforeAll(() => {
                delete process.env.HMAC_SECRET
                sut = HMAC.create()
            })

            it('should create a hash', () => {
                expect(sut.createHash('Hadi')).toEqual(
                    '53967405b232afb72e6def03ad7aa327c7ce443484d3c4e3b3cc700bc4c9f2ca',
                )
            })

            it('should create a second hash with same instantiation', () => {
                expect(sut.createHash('Tajallaei')).toEqual(
                    '0000535b84bad6f3dab8c4d4907fbc562f0ae3b4f564b7c02a7b48223dc0b8aa',
                )
            })
        })
    })
})
