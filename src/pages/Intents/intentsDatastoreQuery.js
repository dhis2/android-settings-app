import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import isEmpty from 'lodash/isEmpty'
import { useEffect, useState } from 'react'
import { CUSTOM_INTENTS, NAMESPACE } from '../../constants/data-store'
import { createKeyCustomIntent, updateSharingMutation } from '../../modules'
import { validateObjectByProperty } from '../../utils/validators'

/**
 * update data store
 * key: Custom intents
 * */

export const saveCustomIntentsMutation = {
    resource: `dataStore/${NAMESPACE}/${CUSTOM_INTENTS}`,
    type: 'update',
    data: ({ settings }) => ({ customIntents: [...settings.customIntents] }),
}

/**
 * Query to get Customs Intents from Data store
 * key: Custom Intents
 * */

export const getCustomIntentsQuery = {
    customIntents: {
        resource: `dataStore/${NAMESPACE}/${CUSTOM_INTENTS}`,
    },
}

const getMetadataQuery = {
    customIntents: {
        resource: `dataStore/${NAMESPACE}/${CUSTOM_INTENTS}/metaData`,
    },
}

const validateRequestArguments = (args) => {
    if (!Array.isArray(args)) {
        return false
    }

    return args.every(
        ({ key, value }) =>
            typeof key === 'string' &&
            key.trim().length > 0 &&
            typeof value === 'string' &&
            value.trim().length > 0
    )
}

export const validMandatoryFields = (specificSettings) => {
    if (
        specificSettings.trigger?.dataElements?.length === 0 &&
        specificSettings.trigger?.attributes?.length === 0
    ) {
        return false
    }

    const isValid =
        validateObjectByProperty(
            ['name', 'action', 'packageName'],
            specificSettings
        ) &&
        validateObjectByProperty(
            ['argument', 'path'],
            specificSettings?.response.data
        ) &&
        validateRequestArguments(specificSettings?.request?.arguments)
    return isValid
}

export const useReadCustomIntentsDataStore = () => {
    const {
        data,
        loading: loadingNamespace,
        error: initialDataError,
    } = useDataQuery(getCustomIntentsQuery)
    const needToCreateCustomIntentsKey =
        initialDataError?.details?.httpStatusCode === 404
    const [mutate] = useDataMutation(createKeyCustomIntent)
    const { refetch } = useDataQuery(getMetadataQuery, { lazy: true })
    const [mutateSharing] = useDataMutation(updateSharingMutation)
    const [customIntents, setCustomIntents] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                await mutate()
                const metadata = await refetch()
                await mutateSharing({ id: metadata?.[CUSTOM_INTENTS]?.id })
                setCustomIntents([])
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        if (
            needToCreateCustomIntentsKey ||
            (isEmpty(data) && !loadingNamespace)
        ) {
            fetchData()
        } else {
            setCustomIntents(data?.[CUSTOM_INTENTS]?.[CUSTOM_INTENTS])
        }
    }, [data, needToCreateCustomIntentsKey])

    return {
        load: loading || loadingNamespace,
        errorDataStore: error,
        customIntents: customIntents,
    }
}
