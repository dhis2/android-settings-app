import { useDataQuery } from '@dhis2/app-runtime'

/**
 * Query to get a random id number
 * */
const idQuery = {
    system: {
        resource: 'system/id',
    },
}

export const useSystemId = () =>
    useDataQuery(idQuery, {
        lazy: true,
    })
