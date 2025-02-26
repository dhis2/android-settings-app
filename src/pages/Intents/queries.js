import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import isEmpty from 'lodash/isEmpty'
import { useEffect, useState } from 'react'
import { CUSTOM_INTENTS, NAMESPACE } from '../../constants/data-store'
import { createKeyCustomIntent } from '../../modules'

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
    const { loading, error, data } = useDataQuery(getCustomIntentsQuery)
    const [mutate] = useDataMutation(createKeyCustomIntent)
    const { refetch } = useDataQuery(getMetadataQuery, { lazy: true })
    const [customIntents, setCustomIntents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                await mutate()
            } catch (error) {
                console.error(error)
            }
        }

        if (isEmpty(data)) {
            console.error(error)
        }
    }, [data])

    return {
        load: loading,
        errorDataStore: error,
        customIntents: customIntents,
    }
}
