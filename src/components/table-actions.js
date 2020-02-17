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
import PropTypes from '@dhis2/prop-types'
import dataTableStyles from '../styles/DataTable.module.css'

const TableActions = ({ columns, rows, menuActions }) => {
    return (
        <Table>
            <TableHead>
                <TableRowHead>
                    {columns.map(column => (
                        <TableCellHead key={column}>{column}</TableCellHead>
                    ))}
                    <TableCellHead>{i18n.t('Actions')}</TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody>
                {rows.map(row => (
                    <TableRow key={row.id}>
                        <TableCell
                            className={dataTableStyles.dataTable_row_title}
                        >
                            {row.name}
                        </TableCell>
                        <TableCell
                            className={dataTableStyles.dataTable_row_title}
                        >
                            {row.sumarySettings}
                        </TableCell>

                        <TableCell dense>
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

TableActions.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    menuActions: PropTypes.object.isRequired,
}

export default TableActions
