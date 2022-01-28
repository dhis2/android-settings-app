/**
 * Query to get the list of Programs the user has access
 * */
import { useDataQuery } from '@dhis2/app-runtime'

const getDatasetsQuery = {
    dataset: {
        resource: 'dataSets',
        params: {
            fields: ['id', 'name', 'periodType', 'categoryCombo[id,name]'],
            filter: 'access.data.write:eq:true',
            paging: 'false',
        },
    },
}

export const useReadDataset = () => {
    const { loading, error, data } = useDataQuery(getDatasetsQuery)

    return {
        loading,
        error,
        datasetList: data && data.dataset.dataSets,
    }
}
