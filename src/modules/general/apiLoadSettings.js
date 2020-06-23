import api from '../../utils/api'
import { GENERAL_SETTINGS, NAMESPACE } from '../../constants/data-store'
import { getAuthority } from '../getAuthority'

/**
 * When general settings component mount, get namespace and keys from dataStore and return value
 */
export const apiLoadGeneralSettings = async () => {
    return getAuthority().then(hasAuthority => {
        return api.getNamespaces().then(res => {
            if (res.includes(NAMESPACE)) {
                return api.getKeys(NAMESPACE).then(res => {
                    if (res.includes(GENERAL_SETTINGS)) {
                        return api
                            .getValue(NAMESPACE, GENERAL_SETTINGS)
                            .then(res => {
                                res.value.disableAll = !hasAuthority
                                return res.value
                            })
                    }
                })
            }
        })
    })
}
