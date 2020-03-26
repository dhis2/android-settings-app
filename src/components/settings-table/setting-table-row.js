import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputNumber from '../input-number'

import dataTableStyles from '../../styles/DataTable.module.css'

const SettingsTableRow = ({ dataRow, states, onChange }) => {
    return (
        <TableRow>
            <TableCell
                component="th"
                scope="row"
                className={dataTableStyles.dataTable__rows__row__column}
            >
                {dataRow.option}
            </TableCell>
            <TableCell
                className={dataTableStyles.dataTable__rows__row__column}
                align="right"
            >
                {Array.isArray(dataRow.download) === true ? (
                    <Select
                        key={dataRow.keyDownload}
                        value={states[dataRow.keyDownload]}
                        onChange={onChange}
                        id={dataRow.keyDownload}
                        name={dataRow.keyDownload}
                    >
                        {dataRow.download.map(option => (
                            <MenuItem
                                value={option.value}
                                key={option.value}
                                name={option.value}
                            >
                                <em> {option.label} </em>
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    <InputNumber
                        name={dataRow.keyDownload}
                        max={dataRow.maxValue}
                        value={states[dataRow.keyDownload]}
                        onChange={onChange}
                    />
                )}
            </TableCell>
        </TableRow>
    )
}

export default SettingsTableRow
