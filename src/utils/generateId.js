const abc = 'abcdefghijklmnopqrstuvwxyz'
const letters = abc + abc.toUpperCase()

const ALLOWED_CHARS = `0123456789${letters}`
const CODESIZE = 11
const CODE_PATTERN = /^[a-zA-Z]{1}[a-zA-Z0-9]{10}$/

function randomWithMax(max) {
    return Math.floor(Math.random() * max)
}

export function generateDhis2Id() {
    let randomChars = letters.charAt(randomWithMax(letters.length))

    for (let i = 1; i < CODESIZE; i += 1) {
        randomChars += ALLOWED_CHARS.charAt(randomWithMax(ALLOWED_CHARS.length))
    }

    return randomChars
}

export function isValidUid(uid) {
    return !!uid && CODE_PATTERN.test(uid)
}
