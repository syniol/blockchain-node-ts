import { DigitalSignature } from './signature'
import crypto from 'crypto'

describe('DigitalSignature Specs', () => {
    let sut: DigitalSignature

    // import fs from 'fs'
    // openssl genrsa -out rsa.private 1024
    // openssl genrsa -out rsa.private 2048
    // openssl rsa -in rsa.private -out rsa.public -pubout -outform PEM
    // const privateKey = fs.readFileSync(
    //     __dirname + '/keys/rsa.private',
    // )
    // const publicKey = fs.readFileSync(
    //     __dirname + '/keys/rsa.public',
    // )

    const mockDataForSignature = 'Syniol is Awesome!'
    const { publicKey, privateKey } =
        crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                format: 'pem',
                type: 'pkcs1',
            },
            privateKeyEncoding: {
                format: 'pem',
                type: 'pkcs1',
            },
        })

    describe('given public key and private key is provided at instantiation', () => {
        beforeAll(() => {
            sut = new DigitalSignature(
                publicKey.toString(),
                privateKey.toString(),
            )
        })

        it('should verify', () => {
            const sign = sut.sign(mockDataForSignature)
            expect(
                sut.verify(mockDataForSignature, sign),
            ).toBeTruthy()
        })

        it('should not verify', () => {
            const sign = sut.sign(mockDataForSignature)
            expect(
                sut.verify(
                    'Different Mock Data for Signature',
                    sign,
                ),
            ).toBeFalsy()
        })
    })

    describe('given private and public key given as environment variable', () => {
        beforeAll(() => {
            process.env.DS_PUB_KEY = publicKey.toString()
            process.env.DS_PRV_KEY = privateKey.toString()

            sut = DigitalSignature.create()
        })

        afterAll(() => {
            delete process.env.DS_PUB_KEY
            delete process.env.DS_PRV_KEY
        })

        it('should verify with DS_PUB_KEY & DS_PRV_KEY defined', () => {
            const sign = sut.sign(mockDataForSignature)
            expect(
                sut.verify(mockDataForSignature, sign),
            ).toBeTruthy()
        })

        it('should not verify with DS_PUB_KEY & DS_PRV_KEY defined', () => {
            const sign = sut.sign(mockDataForSignature)
            expect(
                sut.verify(
                    'Different Mock Data for Signature',
                    sign,
                ),
            ).toBeFalsy()
        })
    })
})
