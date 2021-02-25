import { useDataQuery } from '@dhis2/app-runtime'
import { NAMESPACE } from '../constants/data-store'

export const namespaceDataStoreQuery = {
    dataStore: {
        resource: 'dataStore',
    },
}

export const authorityQuery = {
    authority: {
        resource: 'me/authorization/ALL',
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
    const { loading, error, data } = useDataQuery(authorityQuery)

    return {
        load: loadNamespaces || loading,
        error: errorNamespace || error,
        namespace: dataNamespace && dataNamespace.dataStore.includes(NAMESPACE),
        authority: data && data.authority,
    }
}
