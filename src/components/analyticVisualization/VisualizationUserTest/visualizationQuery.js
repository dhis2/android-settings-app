import { useDataQuery } from '@dhis2/app-runtime'

const visualizations = {
    visualizations: {
        resource: 'visualizations',
        id: ({ visualizationId }) => `${visualizationId}`,
        params: {
            fields: [
                'id',
                'name',
                'publicAccess',
                'userGroupAccesses',
                'userAccesses',
            ],
            pager: 'false',
        },
    },
}

/**
 * Query to get data set list
 * */

export const useReadVisualizationsQuery = ({ visualizationId }) =>
    useDataQuery(visualizations, {
        variables: { visualizationId: visualizationId || '' },
        lazy: true,
    })
