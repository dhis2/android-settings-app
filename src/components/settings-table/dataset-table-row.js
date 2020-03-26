import React from 'react'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import InputNumber from '../input-number'
import dataTableStyles from '../../styles/DataTable.module.css'

const DataSetTableRow = ({
    dataRow,
    periodType,
    defaultValue,
    states,
    onChange,
}) => {
    return (
        <TableRow>
            <TableCell
                component="th"
                scope="row"
                className={dataTableStyles.dataTable__rows__row__column}
            >
                {dataRow.option} ({periodType})
            </TableCell>
            <TableCell
                className={dataTableStyles.dataTable__rows__row__column}
                align="right"
            >
                <InputNumber
                    name={dataRow.keyDownload}
                    max={dataRow.maxValue}
                    value={states[dataRow.keyDownload]}
                    onChange={onChange}
                />
            </TableCell>
        </TableRow>
    )
}

export default DataSetTableRow
