import { isValidURL } from '../isValidURL'

test('"https://debug.dhis2.org" is a valid URL', () => {
    const url = 'https://debug.dhis2.org'
    expect(isValidURL(url)).toBeTruthy()
})

test('"http://www.aa.com" is a valid URL', () => {
    const url = 'http://www.aa.com'
    expect(isValidURL(url)).toBeTruthy()
})

test('"http://hoyhabloyo.com:8080/matomo.php" is a valid URL', () => {
    const url = 'http://hoyhabloyo.com:8080/matomo.php'
    expect(isValidURL(url)).toBeTruthy()
})

test('"http://matomo.o3" is a valid URL', () => {
    const url = 'http://matomo.o3'
    expect(isValidURL(url)).toBeTruthy()
})

test('"http://future" is not a valid URL', () => {
    const url = 'http://future'
    expect(isValidURL(url)).toBeFalsy()
})

test('"www.google.com" is a not valid URL', () => {
    const url = 'www.google.com'
    expect(isValidURL(url)).toBeFalsy()
})

test('"apple.gr" is not a valid URL', () => {
    const url = 'apple.gr'
    expect(isValidURL(url)).toBeFalsy()
})
