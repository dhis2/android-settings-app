import { validateNumber } from '../validatePhoneNumber'

test('phone number that start with "+" is a valid phone number', () => {
    const phoneNumber = '+51669'
    expect(validateNumber(phoneNumber)).toBeTruthy()
})

test('phone number is valid', () => {
    const phoneNumber = '+516698556'
    expect(validateNumber(phoneNumber)).toBeTruthy()
})

test('phone number with less than 16 digits is a valid phone number', () => {
    const phoneNumber = '+516698556945324'
    expect(validateNumber(phoneNumber)).toBeTruthy()
})

test('phone number that does not start with "+" is not a valid phone number', () => {
    const phoneNumber = '516698556'
    expect(validateNumber(phoneNumber)).toBeFalsy()
})

test('phone number that ends with "+" is not a valid phone number', () => {
    const phoneNumber = '516698556+'
    expect(validateNumber(phoneNumber)).toBeFalsy()
})

test('phone number that does not have at least 4 digits is not a valid phone number', () => {
    const phoneNumber = '+516'
    expect(validateNumber(phoneNumber)).toBeFalsy()
})

test('phone number that has more than 16 digits is not a valid phone number', () => {
    const phoneNumber = '+516698556942127356'
    expect(validateNumber(phoneNumber)).toBeFalsy()
})

test('null is not a valid phone number', () => {
    const phoneNumber = null
    expect(validateNumber(phoneNumber)).toBeFalsy()
})

test('undefined is not a valid phone number', () => {
    const phoneNumber = undefined
    expect(validateNumber(phoneNumber)).toBeFalsy()
})

test('"" is not a valid phone number', () => {
    const phoneNumber = ''
    expect(validateNumber(phoneNumber)).toBeFalsy()
})

test('"hello" is not a valid phone number', () => {
    const phoneNumber = 'hello'
    expect(validateNumber(phoneNumber)).toBeFalsy()
})
