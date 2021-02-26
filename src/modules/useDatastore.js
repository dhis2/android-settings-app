import { useDataQuery } from '@dhis2/app-runtime'
import { GENERAL_SETTINGS, NAMESPACE } from '../constants/data-store'

/**
 * Query to get General Settings from Data store
 * */

export const getGeneralKeyQuery = {
    generalSettings: {
        resource: `dataStore/${NAMESPACE}/${GENERAL_SETTINGS}`,
    },
}

export const useGeneralDataStore = () => {
    const { loading, error, data } = useDataQuery(getGeneralKeyQuery)
    return {
        load: loading,
        errorAuth: error,
        generalSettings: data && data.generalSettings,
    }
}
