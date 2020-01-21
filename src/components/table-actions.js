import React from 'react'

import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
} from '@dhis2/ui-core'
import IconButton from '@material-ui/core/IconButton'
import { DeleteOutlined, CreateOutlined } from '@material-ui/icons'
import i18n from '@dhis2/d2-i18n'
import dataTableStyles from '../styles/DataTable.module.css'

const TableActions = ({ columns, rows, menuActions }) => {
    return (
        <Table dataTest="dhis2-uicore-table">
            <TableHead dataTest="dhis2-uicore-tablehead">
                <TableRowHead dataTest="dhis2-uicore-tablerowhead">
                    {columns.map(column => (
                        <TableCellHead
                            dataTest="dhis2-uicore-tablecellhead"
                            key={column}
                        >
                            {column}
                        </TableCellHead>
                    ))}
                    <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                        {i18n.t('Actions')}
                    </TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody dataTest="dhis2-uicore-tablebody">
                {rows.map(row => (
                    <TableRow dataTest="dhis2-uicore-tablerow" key={row.id}>
                        <TableCell
                            dataTest="dhis2-uicore-tablecell"
                            className={dataTableStyles.dataTable_row_title}
                        >
                            {row.name}
                        </TableCell>
                        <TableCell
                            dataTest="dhis2-uicore-tablecell"
                            className={dataTableStyles.dataTable_row_title}
                        >
                            {row.sumarySettings}
                        </TableCell>

                        <TableCell dataTest="dhis2-uicore-tablecell" dense>
                            <IconButton
                                onClick={() => {
                                    menuActions.edit(row)
                                }}
                            >
                                <CreateOutlined fontSize="small" />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    menuActions.delete(row)
                                }}
                            >
                                <DeleteOutlined fontSize="small" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableActions
