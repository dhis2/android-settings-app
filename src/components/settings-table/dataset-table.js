import React, { useEffect, useState } from 'react'
import Wrapper from '../wrapper'
import DataSetTableRow from './dataset-table-row'
import { periodTypeConstants } from '../../constants/data-set-settings'

const DataSetTable = props => {
    const [dataSet, setDataset] = useState(props.dataSetSelected)
    const [dataSetData, setData] = useState(props.data)
    const [periodType, setPeriodType] = useState('')
    const [defaultValue, setDefault] = useState('')
    const [dataSetFilter, setDataSetFiltered] = useState('')
    const [selected, setSelected] = useState(false)

    const checkPeriodType = () => {
        if (props.dataSetSelected !== '') {
            const dataSetSelected = props.completeListOptions.filter(
                dataSetOption => dataSetOption.id === props.dataSetSelected
            )

            setDataset(props.dataSetSelected)
            setDataSetFiltered(dataSetSelected)
            setPeriodType(dataSetSelected[0].periodType)
            setDefault(
                periodTypeConstants[dataSetSelected[0].periodType].default
            )
            setSelected(true)
        }
    }

    useEffect(() => {
        if (props.dataSetSelected !== '') {
            if (!dataSet || !periodType || dataSet !== props.dataSetSelected) {
                checkPeriodType()
            }
        }
    })

    if (!dataSet || !periodType || props.dataSetSelected === '') {
        return null
    } else {
        return (
            <Wrapper fullWidth>
                <div>
                    {dataSetData.map(row => (
                        <DataSetTableRow
                            key={row.option}
                            dataRow={row}
                            periodType={periodType}
                            defaultValue={defaultValue}
                            states={props.states}
                            onChange={props.onChange}
                        />
                    ))}
                </div>
            </Wrapper>
        )
    }
}

export default DataSetTable
