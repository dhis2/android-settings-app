import api from '../../utils/api'
import { GENERAL_SETTINGS, NAMESPACE } from '../../constants/data-store'
import { getInstance } from 'd2'

const getAuthority = () => {
    return getInstance().then(d2 => {
        const url = 'me/authorization/ALL'
        return d2.Api.getApi().get(url)
    })
}

export const apiUpdateDataStore = async data => {
    const hasAuthority = await getAuthority()
    if (hasAuthority) {
        return await api.updateValue(NAMESPACE, GENERAL_SETTINGS, data)
    } else {
        throw new Error(
            'You do not have the authority to update the current section'
        )
    }
}
