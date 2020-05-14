import React from 'react'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import InputNumber from '../input-number'
import i18n from '@dhis2/d2-i18n'
import dataTableStyles from '../../styles/DataTable.module.css'
import tableTitleStyles from '../../styles/TableTitle.module.css'

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
                <p>
                    {dataRow.option} ({periodType})
                </p>
                <em className={tableTitleStyles.attributeLabel}>
                    {i18n.t('Default:')} {defaultValue}
                </em>
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
