import { useDataQuery } from '@dhis2/app-runtime'

/**
 * Query to get program attributes by program id
 * */

const attributesQuery = {
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

export const useGetProgram = () => {
    const { data } = useDataQuery(attributesQuery)

    return {
        programs: data && data.programs?.programs,
    }
}
