export const isValidURL = url => {
    try {
        const u = new URL(url)
        const regEx = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        return ['https:', 'http:'].includes(u.protocol) && url.match(regEx)
    } catch (error) {
        return false
    }
}
