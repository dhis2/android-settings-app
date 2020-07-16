import api from '../utils/api'
import { NAMESPACE } from '../constants/data-store'
import { getAuthority } from './getAuthority'

export const WITH_NAMESPACE = 'namespace'
export const AUTHORITY = 'authority'
export const NO_AUTHORITY = 'noAuthority'

export const apiFirstLoad = () => {
    return getAuthority().then(hasAuthority => {
        return api.getNamespaces().then(result => {
            if (result.includes(NAMESPACE)) {
                return WITH_NAMESPACE
            } else {
                return hasAuthority ? AUTHORITY : NO_AUTHORITY
            }
        })
    })
}
