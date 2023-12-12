import { useDataQuery } from '@dhis2/app-runtime'

/**
 * Query to get program list with attributes and indicators
 * */

const programQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: [
                'id',
                'name',
                'programTrackedEntityAttributes[id,trackedEntityAttribute[id,name,valueType]]',
                'programIndicators[id,name,expression]',
            ],
            paging: 'false',
        },
    },
}

export const useGetPrograms = () => {
    const { data } = useDataQuery(programQuery)

    return {
        programs: data && data.programs?.programs,
    }
}
