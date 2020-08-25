import api from '../../utils/api'
import { GENERAL_SETTINGS, NAMESPACE } from '../../constants/data-store'
import { getAuthority } from '../getAuthority'

/**
 * Check:
 * if dataStore has ANDROID SETTINGS namespace
 * if dataStore has keys and GENERAL_SETTINGS key,
 * Then: get general settings from dataStore
 * */
const getGeneralSettings = async authority => {
    const hasAuthority = authority

    return api
        .getNamespaces()
        .then(namespaces => {
            if (namespaces.includes(NAMESPACE)) {
                return api.getKeys(NAMESPACE)
            }
        })
        .then(keys => {
            if (keys && keys.includes(GENERAL_SETTINGS)) {
                return getSettingsFromDataStore(hasAuthority)
            }
        })
        .then(settings => settings)
        .catch(e => e)
}

/**
 * Get general settings from dataStore and add disable flag in case user has authority
 * */
const getSettingsFromDataStore = hasAuthority =>
    api.getValue(NAMESPACE, GENERAL_SETTINGS).then(settings => {
        const generalSettings = settings.value
        generalSettings.reservedValues = generalSettings.reservedValues.toString()
        generalSettings.disableAll = !hasAuthority
        return generalSettings
    })

/**
 * When general settings component mount, check if user has ALL authority, get namespace and keys from dataStore and return value
 */
export const apiLoadGeneralSettings = async () =>
    getAuthority().then(hasAuthority => getGeneralSettings(hasAuthority))
