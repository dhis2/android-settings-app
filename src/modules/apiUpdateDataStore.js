import api from '../utils/api'
import { getInstance } from 'd2'
import { NAMESPACE } from '../constants/data-store'

const getAuthority = () => {
    return getInstance().then(d2 => {
        const url = 'me/authorization/ALL'
        return d2.Api.getApi().get(url)
    })
}

export const apiUpdateDataStore = async (data, keyName) => {
    const hasAuthority = await getAuthority()
    if (hasAuthority) {
        return await api.updateValue(NAMESPACE, keyName, data)
    } else {
        throw new Error(
            'You do not have the authority to update the current section'
        )
    }
}
