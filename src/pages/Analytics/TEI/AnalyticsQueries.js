import { useDataQuery } from '@dhis2/app-runtime'

const programsQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: [
                'id',
                'name',
                'programType',
                'programStages[id,name,repeatable]',
            ],
            filter: 'programStages.repeatable:eq:true',
            pager: 'false',
        },
    },
}

/**
 * Query to get program list
 * return only list of program with registration and repeatable program stage
 * */

export const useReadProgramQuery = () => {
    const { loading, data, error } = useDataQuery(programsQuery)
    let programList = []
    if (data) {
        programList = data.programs.programs.filter(
            program => program.programType === 'WITH_REGISTRATION'
        )

        programList.map(program => {
            program.programStages = program.programStages.filter(
                programStage => programStage.repeatable === true
            )
            return program
        })
    }

    return {
        loading,
        error,
        programList: data && programList,
    }
}

/**
 * Query to get data elements based on program stage id
 * */

const dataElementsQuery = {
    programStages: {
        resource: 'programStages',
        id: ({ programId }) => `${programId}`,
        params: {
            fields: [
                'id',
                'name',
                'programStageDataElements[dataElement[id,name,valueType]',
            ],
            pager: 'false',
        },
    },
}

export const useReadDataElementsQuery = ({ programId }) =>
    useDataQuery(dataElementsQuery, {
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
            pager: 'false',
        },
    },
}

export const useReadAttributesQuery = ({ programId }) =>
    useDataQuery(attributesQuery, {
        variables: { programId: programId || '' },
        lazy: true,
    })

/**
 * Query to get program indicators
 * */
const programIndicatorsQuery = {
    programs: {
        resource: 'programs',
        id: ({ programId }) => `${programId}`,
        params: {
            fields: ['id', 'name', 'programIndicators[id,name,expression]'],
            pager: 'false',
        },
    },
}

export const useReadProgramIndicatorsQuery = ({ programId }) =>
    useDataQuery(programIndicatorsQuery, {
        variables: { programId: programId || '' },
        lazy: true,
    })

/**
 * Query to get a random id number
 * */
const idQuery = {
    system: {
        resource: 'system/id',
    },
}

export const useReadIdQuery = () =>
    useDataQuery(idQuery, {
        lazy: true,
    })
