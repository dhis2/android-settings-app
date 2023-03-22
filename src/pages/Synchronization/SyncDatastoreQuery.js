import { useDataQuery } from '@dhis2/app-runtime'
import { NAMESPACE, SYNC_SETTINGS } from '../../constants/data-store'
import { useApiVersion } from '../../utils/useApiVersion'
import { createInitialValues } from './Global/helper'

/**
 * update data store
 * key: Synchronization
 * Settings that can be saved here: Global, Programs, Dataset
 * */
export const saveSynchronizationKeyMutation = {
    resource: `dataStore/${NAMESPACE}/${SYNC_SETTINGS}`,
    type: 'update',
    data: ({ settings }) => ({
        ...settings,
        lastUpdated: new Date().toJSON(),
    }),
}

/**
 * Query to get Global Synchronization settings
 * */

export const getSyncKeyQuery = {
    syncSettings: {
        resource: `dataStore/${NAMESPACE}/${SYNC_SETTINGS}`,
    },
}

export const useGetSyncDataStore = () => {
    const { loading, error, data } = useDataQuery(getSyncKeyQuery)
    const { apiVersion } = useApiVersion()

    return {
        load: loading,
        errorSync: error,
        syncSettings: data && data.syncSettings,
        syncGlobal: data && createInitialValues(data.syncSettings, apiVersion),
        programSettings: data && data.syncSettings.programSettings,
        dataSetSettings: data && data.syncSettings.dataSetSettings,
    }
}
