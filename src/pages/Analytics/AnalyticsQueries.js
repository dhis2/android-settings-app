import { NAMESPACE } from '../../constants/data-store'

/**
 * update data store
 * key: Analytics
 * */
export const saveAnalyticsKeyMutation = {
    resource: `dataStore/${NAMESPACE}/analytics`,
    type: 'update',
    data: ({ settings }) => ({
        ...settings,
        lastUpdated: new Date().toJSON(),
    }),
}

/**
 * Query to get Analytics Settings from Data store
 * key: Analytics Settings
 * */

export const getAnalyticsKeyQuery = {
    analytics: {
        resource: `dataStore/${NAMESPACE}/analytics`,
    },
}
