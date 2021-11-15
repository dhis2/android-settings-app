import { useDataQuery } from '@dhis2/app-runtime'

const datasetsQuery = {
    dataset: {
        resource: 'dataSets',
        params: {
            fields: ['id', 'name'],
            pager: false,
        },
    },
}

/**
 * Query to get data set list
 * */

export const useReadDatasetQuery = () => {
    const { loading, data, error } = useDataQuery(datasetsQuery)

    return {
        loading,
        error,
        datasetList: data && data.dataset.dataSets,
    }
}
