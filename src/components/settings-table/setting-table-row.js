import React from 'react'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { TableRow, TableCell, RadioGroup, Radio } from '@dhis2/ui-core'
import InputNumber from '../input-number'
import cx from 'classnames'
import dataTableStyles from '../../styles/DataTable.module.css'
import radioStyles from '../../styles/Input.module.css'
import disable from '../../styles/Disable.module.css'

const SettingsTableRow = ({ dataRow, states, onChange }) => {
    return (
        <TableRow>
            <TableCell
                className={cx({ [disable.disable_label]: states.disableAll })}
            >
                {dataRow.option}
            </TableCell>
            <TableCell
                className={cx(
                    dataTableStyles.dataTable__rows__row__column,
                    dataTableStyles.dataTable_align_end
                )}
                align="right"
            >
                {Array.isArray(dataRow.download) === true ? (
                    dataRow.radioButton === true ? (
                        <RadioGroup
                            dense
                            name={dataRow.keyDownload}
                            id={dataRow.keyDownload}
                            onChange={onChange}
                            value={states[dataRow.keyDownload]}
                            className={radioStyles.container_content_inline}
                            disabled={states.disableAll}
                        >
                            {dataRow.download.map(option => (
                                <Radio
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                />
                            ))}
                        </RadioGroup>
                    ) : (
                        <Select
                            key={dataRow.keyDownload}
                            value={states[dataRow.keyDownload]}
                            onChange={onChange}
                            id={dataRow.keyDownload}
                            name={dataRow.keyDownload}
                            disabled={states.disableAll}
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
                    )
                ) : (
                    <InputNumber
                        name={dataRow.keyDownload}
                        max={dataRow.maxValue}
                        value={states[dataRow.keyDownload]}
                        onChange={onChange}
                        disabled={states.disableAll}
                    />
                )}
            </TableCell>
        </TableRow>
    )
}

export default SettingsTableRow
