import api from '../../utils/api'
import { GENERAL_SETTINGS, NAMESPACE } from '../../constants/data-store'
import { getAuthority } from '../getAuthority'

/**
 * Check if dataStore has ANDROID SETTINGS namespace and GENERAL_SETTINGS key, get general settings from dataStore
 * */
const getGeneralSettings = async authority => {
    const hasAuthority = authority

    return api
        .getNamespaces()
        .then(
            namespaces =>
                namespaces.includes(NAMESPACE) && api.getKeys(NAMESPACE)
        )
        .then(
            keys =>
                keys.includes(GENERAL_SETTINGS) &&
                getSettingsFromDataStore(hasAuthority)
        )
        .then(settings => settings)
}

/**
 * Get general settings from dataStore and add disable flag in case user has authority
 * */
const getSettingsFromDataStore = hasAuthority => {
    return api.getValue(NAMESPACE, GENERAL_SETTINGS).then(settings => {
        const generalSettings = settings.value
        generalSettings.disableAll = !hasAuthority
        return generalSettings
    })
}

/**
 * When general settings component mount, check if user has ALL authority, get namespace and keys from dataStore and return value
 */
export const apiLoadGeneralSettings = async () => {
    return getAuthority().then(hasAuthority => getGeneralSettings(hasAuthority))
}
