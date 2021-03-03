import { useDataQuery } from '@dhis2/app-runtime'
import { NAMESPACE } from '../constants/data-store'

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

const useGetNamespace = () => {
    const { loading, error, data } = useDataQuery(namespaceDataStoreQuery)
    return {
        loadNamespaces: loading,
        errorNamespace: error,
        dataNamespace: data,
    }
}

export const useNamespaceDataStore = () => {
    const { loadNamespaces, errorNamespace, dataNamespace } = useGetNamespace()

    return {
        load: loadNamespaces,
        error: errorNamespace,
        namespace: dataNamespace && dataNamespace.dataStore.includes(NAMESPACE),
    }
}
