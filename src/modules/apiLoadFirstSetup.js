import { useDataQuery } from '@dhis2/app-runtime'
import { NAMESPACE } from '../constants/data-store'

export const PREV_NAMESPACE = 'ANDROID_SETTING_APP'

export const namespaceDataStoreQuery = {
    dataStore: {
        resource: 'dataStore',
    },
}

export const authorityQuery = {
    authority: {
        resource: 'me/authorities/ALL',
    },
}

export const useNamespaceDataStore = () => {
    const { loading, error, data } = useDataQuery(namespaceDataStoreQuery)

    return {
        loading,
        error,
        namespace: data && data.dataStore.includes(NAMESPACE),
        hasPreviousVersion: data && data.dataStore.includes(PREV_NAMESPACE),
    }
}

export const deletePrevDataStoreMutation = {
    resource: `dataStore/${PREV_NAMESPACE}`,
    type: 'delete',
}
