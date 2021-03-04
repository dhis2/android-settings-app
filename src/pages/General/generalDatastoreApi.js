import { GENERAL_SETTINGS, NAMESPACE } from '../../constants/data-store'

/**
 * update data store
 * key: General Settings
 * */
export const updateGeneralKeyMutation = {
    resource: `dataStore/${NAMESPACE}/${GENERAL_SETTINGS}`,
    type: 'update',
    data: ({ settings }) => ({
        ...settings,
        lastUpdated: new Date().toJSON(),
    }),
}

/**
 * Query to get General Settings from Data store
 * key: General Settings
 * */

export const getGeneralKeyQuery = {
    generalSettings: {
        resource: `dataStore/${NAMESPACE}/${GENERAL_SETTINGS}`,
    },
}
