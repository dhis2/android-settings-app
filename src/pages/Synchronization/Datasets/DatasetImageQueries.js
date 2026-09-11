import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect, useState } from 'react'
import { IMAGE_VALUE_TYPE } from '../../../constants/image-settings'
import { dedupeById } from '../../../utils/utils'

const query = {
    dataSets: {
        resource: 'dataSets',
        params: {
            fields: ['id', 'dataSetElements[dataElement[id,name,valueType]]'],
            paging: false,
        },
    },
}

const getDataSetImageItems = (dataSet) =>
    dedupeById(
        (dataSet.dataSetElements || [])
            .map((dataSetElement) => dataSetElement.dataElement)
            .filter(
                (dataElement) => dataElement?.valueType === IMAGE_VALUE_TYPE
            )
    )

export const useDataSetImageItems = () => {
    const { data, error } = useDataQuery(query)
    const [dataSetImageItemsById, setDataSetImageItemsById] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (data) {
            const itemsById = {}
            data?.dataSets?.dataSets.forEach((dataSet) => {
                itemsById[dataSet.id] = getDataSetImageItems(dataSet)
            })
            setDataSetImageItemsById(itemsById)
            setLoaded(true)
        }

        if (error) {
            setLoaded(true)
        }
    }, [data, error])

    return { dataSetImageItemsById, loaded }
}
