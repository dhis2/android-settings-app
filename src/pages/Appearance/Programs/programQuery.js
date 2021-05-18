import { useDataQuery } from '@dhis2/app-runtime'
/**
 * Query to get the list of Programs the user has access
 * */

const getProgramsQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: ['id', 'name', 'programType', 'categoryCombo[id,name]'],
            filter: 'access.data.write:eq:true',
            pager: false,
        },
    },
}

export const useReadProgram = () => {
    const { loading, error, data } = useDataQuery(getProgramsQuery)
    return {
        loading,
        error,
        programList: data && data.programs.programs,
    }
}
