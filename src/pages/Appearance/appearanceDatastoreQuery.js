import { useDataQuery } from '@dhis2/app-runtime'
import { APPEARANCE, NAMESPACE } from '../../constants/data-store'

/**
 * update data store
 * key: Appearance
 * Settings that can be saved here: Home Screen, Programs, Dataset
 * */

export const saveAppearanceKeyMutation = {
    resource: `dataStore/${NAMESPACE}/${APPEARANCE}`,
    type: 'update',
    data: ({ settings }) => ({
        ...settings,
        lastUpdated: new Date().toJSON(),
    }),
}

/**
 * Query to get Appearance Settings from Data store
 * key: Appearance Settings
 * */

export const getAppearanceKeyQuery = {
    appearanceSettings: {
        resource: `dataStore/${NAMESPACE}/${APPEARANCE}`,
    },
}

/**
 * Read Appearance Data store values:
 *
 * */

export const useReadAppearanceDataStore = () => {
    const { loading, error, data } = useDataQuery(getAppearanceKeyQuery)

    return {
        load: loading,
        error,
        programConfiguration:
            data &&
            (data.appearanceSettings.programConfiguration ||
                data.appearanceSettings.completionSpinner),
        completionSpinner: data && data.appearanceSettings.completionSpinner,
        filterSorting: data && data.appearanceSettings.filterSorting,
        home: data && data.appearanceSettings.filterSorting.home,
        programSettings:
            data && data.appearanceSettings.filterSorting.programSettings,
        dataSetSettings:
            data && data.appearanceSettings.filterSorting.dataSetSettings,
        dataSetConfiguration:
            data && data.appearanceSettings.dataSetConfiguration,
    }
}
