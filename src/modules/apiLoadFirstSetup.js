import api from '../utils/api'
import { NAMESPACE } from '../constants/data-store'
import { getAuthority } from './getAuthority'

export const apiFirstLoad = () => {
    return getAuthority().then(hasAuthority => {
        return api.getNamespaces().then(result => {
            if (result.includes(NAMESPACE)) {
                return { hasNamespace: true }
            } else {
                return { hasAuthority, hasNamespace: false }
            }
        })
    })
}
