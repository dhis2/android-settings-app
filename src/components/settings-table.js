import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputNumber from './input-number'

import i18n from '@dhis2/d2-i18n'
import dataTableStyles from '../styles/DataTable.module.css'

const SettingsTable = ({ data, states, onChange }) => {
    return (
        <Table className={dataTableStyles.dataTable}>
            <TableHead>
                <TableRow>
                    <TableCell
                        className={dataTableStyles.dataTable__headers__header}
                    >
                        {' '}
                    </TableCell>
                    <TableCell
                        className={dataTableStyles.dataTable__headers__header}
                        align="right"
                    >
                        {i18n.t('Download')}
                    </TableCell>
                    <TableCell
                        className={dataTableStyles.dataTable__headers__header}
                        align="right"
                    >
                        {i18n.t('DB trimming')}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="data-table__rows">
                {data.map(row => (
                    <TableRow key={row.option}>
                        <TableCell
                            component="th"
                            scope="row"
                            className={
                                dataTableStyles.dataTable__rows__row__column
                            }
                        >
                            {row.option}
                        </TableCell>
                        <TableCell
                            className={
                                dataTableStyles.dataTable__rows__row__column
                            }
                            align="right"
                        >
                            {Array.isArray(row.download) === true ? (
                                <Select
                                    key={row.keyDownload}
                                    value={states[row.keyDownload]}
                                    onChange={onChange}
                                    id={row.keyDownload}
                                    name={row.keyDownload}
                                >
                                    {row.download.map(option => (
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
                                    name={row.keyDownload}
                                    max={row.maxValue}
                                    value={states[row.keyDownload]}
                                    onChange={onChange}
                                />
                            )}
                        </TableCell>
                        <TableCell
                            className={
                                dataTableStyles.dataTable__rows__row__column
                            }
                            align="right"
                        >
                            {Array.isArray(row.DBTrimming) === true ? (
                                <Select
                                    key={row.keyDBTrimming}
                                    value={states[row.keyDBTrimming]}
                                    onChange={onChange}
                                    id={row.keyDBTrimming}
                                    name={row.keyDBTrimming}
                                >
                                    {row.DBTrimming.map(option => (
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
                                    name={row.keyDBTrimming}
                                    max={row.maxValue}
                                    value={states[row.keyDBTrimming]}
                                    onChange={onChange}
                                />
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default SettingsTable
