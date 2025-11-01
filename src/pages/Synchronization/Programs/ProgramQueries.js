import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect, useState } from 'react'
import { filterListByReadAccess } from '../../../utils/utils'
import { useWorkflowContext } from '../../../workflow-context'

/**
 * Combine multiple arrays of objects and group them by program id
 * returns Grouped object by program id
 */
const groupByProgramId = (...arrays) => {
    return arrays.flat().reduce((acc, item) => {
        const programId =
            typeof item?.program === 'string'
                ? item?.program
                : item?.program?.id

        if (!programId) {
            return acc
        }

        if (!acc[programId]) {
            acc[programId] = []
        }

        acc[programId].push(item)

        return acc
    }, {})
}

/**
 * Combines a list of programs with their corresponding filters
 * returns A new array of programs including filters where applicable
 */
const combineProgramsWithFilters = (programsList, filtersByProgramId) => {
    if (
        !Array.isArray(programsList) ||
        typeof filtersByProgramId !== 'object'
    ) {
        return []
    }

    return programsList.map((program) => {
        const filters = filtersByProgramId[program.id] || []
        return filters.length ? { ...program, filters } : { ...program }
    })
}

/**
 * Query to get program list with attributes and indicators
 * */

const query = {
    trackedEntityInstanceFilters: {
        resource: 'trackedEntityInstanceFilters',
        params: {
            fields: ['id', 'displayName', 'name', 'program[id]'],
            paging: false,
        },
    },
    programStageWorkingLists: {
        resource: 'programStageWorkingLists',
        params: {
            fields: ['id', 'displayName', 'name', 'program[id]'],
            paging: false,
        },
    },
    eventFilters: {
        resource: 'eventFilters',
        params: {
            fields: ['id', 'displayName', 'name', 'program'],
            paging: false,
        },
    },
}

export const useProgramFilters = () => {
    const { data } = useDataQuery(query)
    const { programs } = useWorkflowContext()
    const [programFilterList, setProgramFilterList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            const tei =
                data?.trackedEntityInstanceFilters?.trackedEntityInstanceFilters
            const programWorking =
                data?.programStageWorkingList?.programStageWorkingList
            const event = data?.eventFilters?.eventFilters

            const filters = groupByProgramId(tei, programWorking, event)
            const programL = filterListByReadAccess(programs)

            setProgramFilterList(combineProgramsWithFilters(programL, filters))
            setLoading(true)
        }
    }, [data])

    return { programFilterList, loading }
}
