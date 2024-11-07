import { useDataQuery } from '@dhis2/app-runtime'
import { getGeneralKeyQuery } from '../../../General/generalDatastoreApi'
import { useGetSyncDataStore } from '../../SyncDatastoreQuery'

export const getUserQuery = (query = '') => {
    return {
        resource: `users`,
        params: {
            query,
            fields: 'id,name,username,externalAuth,twoFA,passwordLastUpdated,cogsDimensionConstraints,catDimensionConstraints,previousPasswords,selfRegistered,invitation,disabled,sharing,userRoles,userGroups,organisationUnits,teiSearchOrganisationUnits,publicAccess,userGroupAccesses,userAccesses',
            order: 'name:asc',
            paging: 'false',
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
