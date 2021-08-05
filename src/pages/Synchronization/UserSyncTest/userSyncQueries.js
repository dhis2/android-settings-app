import { useDataQuery } from '@dhis2/app-runtime'
import { useGetSyncDataStore } from '../SyncDatastoreQuery'
import { getGeneralKeyQuery } from '../../General/generalDatastoreApi'

export const getUserQuery = (query = '', maxItems = []) => {
    return {
        resource: `users`,
        params: {
            query,
            count: 11,
            max: maxItems,
            fields: 'id,name,userCredentials,userGroups',
            order: 'name:asc',
        },
    }
}

/**
 *
 * Get values from datastore
 * Keys: generalSettings & synchronization
 * values:
 *  programSettings = {
 *      globalSettings
 *      specificSettings
 *  }
 *  general => reservedValues
 *
 * */

export const useReadSettings = () => {
    const { data } = useDataQuery(getGeneralKeyQuery)
    const { load, errorSyncing, programSettings } = useGetSyncDataStore()
    return {
        loading: load,
        errorSettings: errorSyncing,
        reservedValues: data && data.generalSettings.reservedValues,
        globalSettings: programSettings && programSettings.globalSettings,
        specificSettings: programSettings && programSettings.specificSettings,
    }
}
