import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect, useState } from 'react'
import { useApiVersion } from '../../../utils/useApiVersion'
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

/**
 * show list of programs if there is no working list available
 * **/

export const useProgramFilters = () => {
    const { apiVersion } = useApiVersion()
    const { data, loading, error } = useDataQuery(query)
    const { programs } = useWorkflowContext()
    const [programFilterList, setProgramFilterList] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const apiHasWorkingList = apiVersion >= 2.4
        const noProgramWorkingListAccess =
            !loading || error || !apiHasWorkingList
        const programL = filterListByReadAccess(programs)

        if (noProgramWorkingListAccess) {
            setProgramFilterList(programL)
            setLoaded(true)
        }

        if (data) {
            const tei =
                data?.trackedEntityInstanceFilters?.trackedEntityInstanceFilters
            const programWorking =
                data?.programStageWorkingLists?.programStageWorkingLists
            const event = data?.eventFilters?.eventFilters

            const filters = groupByProgramId(tei, programWorking, event)

            setProgramFilterList(combineProgramsWithFilters(programL, filters))
            setLoaded(true)
        }
    }, [data])

    return { programFilterList, loaded }
}
