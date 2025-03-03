import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import isEmpty from 'lodash/isEmpty'
import { useEffect, useState } from 'react'
import { CUSTOM_INTENTS, NAMESPACE } from '../../constants/data-store'
import { createKeyCustomIntent, updateSharingMutation } from '../../modules'

/**
 * update data store
 * key: Custom intents
 * */

export const saveCustomIntentsMutation = {
    resource: `dataStore/${NAMESPACE}/${CUSTOM_INTENTS}`,
    type: 'update',
    data: ({ settings }) => ({
        ...settings,
        lastUpdated: new Date().toJSON(),
    }),
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

export const useReadCustomIntentsDataStore = () => {
    const { data } = useDataQuery(getCustomIntentsQuery)
    const [mutate] = useDataMutation(createKeyCustomIntent)
    const { refetch } = useDataQuery(getMetadataQuery, { lazy: true })
    const [mutateSharing] = useDataMutation(updateSharingMutation)
    const [customIntents, setCustomIntents] = useState([])
    const [loading, setLoading] = useState(true)
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

        if (isEmpty(data)) {
            fetchData()
        } else {
            setCustomIntents(data?.[CUSTOM_INTENTS])
        }
    }, [data])

    return {
        load: loading,
        errorDataStore: error,
        customIntents: customIntents,
    }
}
