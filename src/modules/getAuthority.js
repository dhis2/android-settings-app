import { getInstance } from 'd2'

export const getAuthority = () => {
    return getInstance().then(d2 => {
        const url = 'me/authorization/ALL'
        return d2.Api.getApi().get(url)
    })
}
