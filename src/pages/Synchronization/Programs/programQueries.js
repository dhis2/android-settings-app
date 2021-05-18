import { useDataQuery } from '@dhis2/app-runtime'
/**
 * Query to get the list of Programs the user has access
 * */

export const getProgramsQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: ['id', 'name', 'programType'],
            filter: 'access.data.write:eq:true',
        },
    },
}

export const useReadProgram = () => {
    const { loading, error, data } = useDataQuery(getProgramsQuery)

    return {
        loadProgram: loading,
        errorProgram: error,
        programList: data && data.programs.programs,
    }
}
