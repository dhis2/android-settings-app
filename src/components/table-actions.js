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
                        Actions
                    </TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody dataTest="dhis2-uicore-tablebody">
                {rows.map(row => (
                    <TableRow dataTest="dhis2-uicore-tablerow" key={row.id}>
                        <TableCell dataTest="dhis2-uicore-tablecell">
                            {row.name}
                        </TableCell>
                        <TableCell dataTest="dhis2-uicore-tablecell">
                            {row.sumarySettings}
                        </TableCell>

                        <TableCell dataTest="dhis2-uicore-tablecell" dense>
                            {/* <TableButton /> */}
                            <IconButton
                                onClick={() => {
                                    menuActions.edit(row)
                                }}
                            >
                                {' '}
                                <CreateOutlined fontSize="small" />{' '}
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    menuActions.delete(row)
                                }}
                            >
                                {' '}
                                <DeleteOutlined fontSize="small" />{' '}
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableActions
