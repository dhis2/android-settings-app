export const isValidURL = (url) => {
    try {
        const urlExp =
            /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        return url.match(urlExp)
    } catch (error) {
        return false
    }
}
