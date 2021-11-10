import { useDataQuery } from '@dhis2/app-runtime'

const programsQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: ['id', 'name'],
            pager: false,
        },
    },
}

export const useReadProgramQuery = () => {
    const { loading, data, error } = useDataQuery(programsQuery)

    return {
        loading,
        error,
        programList: data && data.programs.programs,
    }
}
