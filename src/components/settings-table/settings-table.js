import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import SettingsTableRow from './setting-table-row'

import i18n from '@dhis2/d2-i18n'
import dataTableStyles from '../../styles/DataTable.module.css'

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
                </TableRow>
            </TableHead>
            <TableBody className="data-table__rows">
                {data.map(row => (
                    <SettingsTableRow
                        key={row.option}
                        dataRow={row}
                        states={states}
                        onChange={onChange}
                    />
                ))}
            </TableBody>
        </Table>
    )
}

export default SettingsTable
