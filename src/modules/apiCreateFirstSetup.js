import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import map from 'lodash/map'
import { validApiVersion } from '../auth'
import {
    ANALYTICS,
    APPEARANCE,
    CUSTOM_INTENTS,
    GENERAL_SETTINGS,
    INFO,
    NAMESPACE,
    SYNC_SETTINGS,
} from '../constants/data-store'
import { initialSetup } from '../constants/initial-setup'

const {
    info,
    generalSettings,
    synchronization,
    synchronization_v2,
    appearance,
    analytics,
    customIntents,
} = initialSetup

export const createNamespace = {
    resource: `dataStore/${NAMESPACE}/${INFO}`,
    type: 'create',
    data: { ...info },
}

export const createKeyGeneral = {
    resource: `dataStore/${NAMESPACE}/${GENERAL_SETTINGS}`,
    type: 'create',
    data: { ...generalSettings },
}

export const createKeySync = {
    resource: `dataStore/${NAMESPACE}/${SYNC_SETTINGS}`,
    type: 'create',
    data: ({ settings }) => ({ ...settings }),
}

export const createKeyAppearance = {
    resource: `dataStore/${NAMESPACE}/${APPEARANCE}`,
    type: 'create',
    data: { ...appearance },
}

export const createKeyAnalytics = {
    resource: `dataStore/${NAMESPACE}/${ANALYTICS}`,
    type: 'create',
    data: { ...analytics },
}

export const createKeyCustomIntent = {
    resource: `dataStore/${NAMESPACE}/${CUSTOM_INTENTS}`,
    type: 'create',
    data: { ...customIntents },
}

const getMetadataQuery = {
    info: {
        resource: `dataStore/${NAMESPACE}/${INFO}/metaData`,
    },
    general: {
        resource: `dataStore/${NAMESPACE}/${GENERAL_SETTINGS}/metaData`,
    },
    sync: {
        resource: `dataStore/${NAMESPACE}/${SYNC_SETTINGS}/metaData`,
    },
    appearance: {
        resource: `dataStore/${NAMESPACE}/${APPEARANCE}/metaData`,
    },
    analytics: {
        resource: `dataStore/${NAMESPACE}/${ANALYTICS}/metaData`,
    },
    customIntents: {
        resource: `dataStore/${NAMESPACE}/${CUSTOM_INTENTS}/metaData`,
    },
}

export const updateSharingMutation = {
    resource: 'sharing',
    type: 'update',
    params: ({ id }) => ({
        type: 'dataStore',
        id: `${id}`,
    }),
    data: {
        publicAccess: 'r-------',
        externalAccess: false,
    },
}

export const useCreateFirstSetup = () => {
    const [mutateNamespace] = useDataMutation(createNamespace)
    const [mutateCreateGeneral] = useDataMutation(createKeyGeneral)
    const [mutateCreateSync] = useDataMutation(createKeySync)
    const [mutateCreateAppearance] = useDataMutation(createKeyAppearance)
    const [mutateCreateAnalytics] = useDataMutation(createKeyAnalytics)
    const [mutateCreateCustomIntent] = useDataMutation(createKeyCustomIntent)
    const [mutateSharing] = useDataMutation(updateSharingMutation)
    const { refetch } = useDataQuery(getMetadataQuery, { lazy: true })

    const createSetup = async (apiVersion) => {
        const sync = validApiVersion(apiVersion)
            ? synchronization_v2
            : synchronization

        try {
            await mutateNamespace()
            await Promise.all([
                mutateCreateGeneral(),
                mutateCreateSync({ settings: { ...sync } }),
                mutateCreateAppearance(),
                mutateCreateAnalytics(),
                mutateCreateCustomIntent(),
            ])
            const keyList = await refetch()
            await Promise.all(
                map(keyList, (key) => mutateSharing({ id: key.id }))
            )
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    return { createSetup }
}
