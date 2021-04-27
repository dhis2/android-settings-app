import { isValidURL } from '../isValidURL'

test('"https://debug.dhis2.org" is a valid URL', () => {
    const url = 'https://debug.dhis2.org'
    expect(isValidURL(url)).toBeTruthy()
})

test('"www.google.com" is a valid URL', () => {
    const url = 'www.google.com'
    expect(isValidURL(url)).toBeTruthy()
})

test('"http://www.aa.com" is a valid URL', () => {
    const url = 'http://www.aa.com'
    expect(isValidURL(url)).toBeTruthy()
})

test('"apple.gr" is a valid URL', () => {
    const url = 'apple.gr'
    expect(isValidURL(url)).toBeTruthy()
})

test('"http://matomo.o3" is not a valid URL', () => {
    const url = 'http://matomo.o3'
    expect(isValidURL(url)).toBeFalsy()
})

test('"http://future" is not a valid URL', () => {
    const url = 'http://future'
    expect(isValidURL(url)).toBeFalsy()
})
