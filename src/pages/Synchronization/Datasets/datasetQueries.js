import { useDataQuery } from '@dhis2/app-runtime'

/**
 * Query to get the list of Dataset the user has access
 * */

export const getDatasetQuery = {
    dataset: {
        resource: 'dataSets',
        params: {
            fields: ['id', 'name', 'periodType'],
            filter: 'access.read:eq:true',
            pager: false,
        },
    },
}

export const useReadDataset = () => {
    const { loading, error, data } = useDataQuery(getDatasetQuery)

    return {
        loading,
        error,
        datasetList: data && data.dataset.dataSets,
    }
}
