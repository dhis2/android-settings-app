import { ANALYTICS, NAMESPACE } from '../../constants/data-store'
import { useDataQuery } from '@dhis2/app-runtime'

/**
 * update data store
 * key: Analytics
 * Settings that can be saved here: TEI, Home Screen, Programs, Dataset
 * */

export const saveAnalyticsKeyMutation = {
    resource: `dataStore/${NAMESPACE}/${ANALYTICS}`,
    type: 'update',
    data: ({ settings }) => ({
        ...settings,
        lastUpdated: new Date().toJSON(),
    }),
}

/**
 * Query to get Analytics Settings from Data store
 * key: Appearance Settings
 * */

export const getAnalyticsKeyQuery = {
    analytics: {
        resource: `dataStore/${NAMESPACE}/${ANALYTICS}`,
    },
}

/**
 * Read Analytics Data store values:
 * */

export const useReadAnalyticsDataStore = () => {
    const { loading, error, data } = useDataQuery(getAnalyticsKeyQuery)

    return {
        load: loading,
        errorDataStore: error,
        tei: data && data.analytics.tei,
        dhisVisualizations: data && data.analytics.dhisVisualizations,
        home: data && data.analytics.dhisVisualizations.home,
        program: data && data.analytics.dhisVisualizations.program,
        dataSet: data && data.analytics.dhisVisualizations.dataSet,
    }
}
