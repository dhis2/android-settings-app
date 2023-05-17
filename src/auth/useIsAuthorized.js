import { useConfig } from '@dhis2/app-runtime'
import { useAppContext } from '../app-context'
import { NAMESPACE } from '../constants/data-store'
import { PREV_NAMESPACE } from '../modules'

const ALL = 'ALL'
const ANDROID_SETTINGS_AUTH = 'M_androidsettingsapp'
const minVersion = 40

export const useIsAuthorized = () => {
    const { apiVersion } = useConfig()
    const { authorities, dataStore } = useAppContext()

    const hasAuthority = authorities.some((authority) =>
        validAuthByVersion(apiVersion).includes(authority)
    )
    const hasNamespace = dataStore.some((key) => key === NAMESPACE)
    const hasOutDateNamespace = dataStore.includes(PREV_NAMESPACE)

    return { hasAuthority, hasNamespace, hasOutDateNamespace }
}

const validAuthByVersion = (apiVersion) =>
    apiVersion >= minVersion ? [ANDROID_SETTINGS_AUTH, ALL] : ALL

export const validApiVersion = (apiVersion) => apiVersion >= minVersion
