import { isValidValue } from '../isValidValue'

test('true is a valid value', () => {
    expect(isValidValue(true)).toBeTruthy()
})

test('"hello" is a valid value', () => {
    expect(isValidValue('hello')).toBeTruthy()
})

test('3 is a valid value', () => {
    expect(isValidValue(3)).toBeTruthy()
})

test('"" is not a valid value', () => {
    expect(isValidValue('')).toBeFalsy()
})

test('false is not a valid value', () => {
    expect(isValidValue(false)).toBeFalsy()
})

test('null is not a valid value', () => {
    expect(isValidValue(null)).toBeFalsy()
})

test('undefined is not valid value', () => {
    expect(isValidValue(undefined)).toBeFalsy()
})
