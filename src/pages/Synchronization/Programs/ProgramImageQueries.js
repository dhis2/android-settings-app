import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect, useState } from 'react'
import { IMAGE_VALUE_TYPE } from '../../../constants/image-settings'
import { dedupeById } from '../../../utils/utils'

const query = {
    programs: {
        resource: 'programs',
        params: {
            fields: [
                'id',
                'programStages[programStageDataElements[dataElement[id,name,valueType]]]',
                'programTrackedEntityAttributes[trackedEntityAttribute[id,name,valueType]]',
                'trackedEntityType[trackedEntityTypeAttributes[trackedEntityAttribute[id,name,valueType]]]',
            ],
            paging: false,
        },
    },
}

/**
 * IMAGE items for a program imageSettings selector: IMAGE
 * dataElements from any program stage and IMAGE attr assigned at
 * program or tracked entity type level
 */
const getProgramImageItems = (program) => {
    const dataElements = (program?.programStages || [])
        .flatMap((stage) => stage?.programStageDataElements || [])
        .map((psde) => psde?.dataElement)

    const programAttributes = (
        program?.programTrackedEntityAttributes || []
    ).map((programAttribute) => programAttribute?.trackedEntityAttribute)

    const trackedEntityTypeAttributes = (
        program?.trackedEntityType?.trackedEntityTypeAttributes || []
    ).map((typeAttribute) => typeAttribute?.trackedEntityAttribute)

    const imageItems = [
        ...dataElements,
        ...programAttributes,
        ...trackedEntityTypeAttributes,
    ].filter((item) => item?.valueType === IMAGE_VALUE_TYPE)

    return dedupeById(imageItems)
}

export const useProgramImageItems = () => {
    const { data, error } = useDataQuery(query)
    const [programImageItemsById, setProgramImageItemsById] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (data) {
            const itemsById = {}
            data?.programs?.programs.forEach((program) => {
                itemsById[program.id] = getProgramImageItems(program)
            })
            setProgramImageItemsById(itemsById)
            setLoaded(true)
        }

        if (error) {
            setLoaded(true)
        }
    }, [data, error])

    return { programImageItemsById, loaded }
}
