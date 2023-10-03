import { useDataQuery } from '@dhis2/app-runtime'

/**
 * Query to get program indicators
 * */
const programIndicatorsQuery = {
    programIndicators: {
        resource: 'programIndicators',
        id: ({ programId }) => `${programId}`,
        params: {
            fields: ['id', 'name', 'expression'],
            paging: 'false',
        },
    },
}

export const useReadProgramIndicatorsQuery = ({ programId }) =>
    useDataQuery(programIndicatorsQuery, {
        variables: { programId: programId || '' },
        lazy: true,
    })

/**
 * Query to get program attributes by program id
 * */

const attributesQuery = {
    programs: {
        resource: 'programs',
        id: ({ programId }) => `${programId}`,
        params: {
            fields: [
                'id',
                'name',
                'programTrackedEntityAttributes[id,trackedEntityAttribute[id,name,valueType]]',
            ],
            paging: 'false',
        },
    },
}

export const useReadAttributesQuery = ({ programId }) =>
    useDataQuery(attributesQuery, {
        variables: { programId: programId || '' },
        lazy: true,
    })
