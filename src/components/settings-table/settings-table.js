import React from 'react'

import { Table, TableBody } from '@dhis2/ui-core'
import SettingsTableRow from './setting-table-row'
import dataTableStyles from '../../styles/DataTable.module.css'

const SettingsTable = ({ data, states, onChange }) => {
    return (
        <Table className={dataTableStyles.dataTable}>
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
