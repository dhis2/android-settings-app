import React from 'react'

import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
    ButtonStrip,
    Button,
} from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import dataTableStyles from '../styles/DataTable.module.css'
import disableStyle from '../styles/Disable.module.css'

const TableActions = ({ columns, rows, menuActions, states }) => {
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
                            className={`${
                                dataTableStyles.dataTable_row_title
                            } ${states.disableAll &&
                                disableStyle.disable_label}`}
                        >
                            {row.name}
                        </TableCell>
                        <TableCell
                            className={`${
                                dataTableStyles.dataTable_row_title
                            } ${states.disableAll &&
                                disableStyle.disable_label}`}
                        >
                            {row.summarySettings}
                        </TableCell>

                        <TableCell dense>
                            <ButtonStrip>
                                <Button
                                    small
                                    secondary
                                    onClick={() => {
                                        menuActions.edit(row)
                                    }}
                                    disabled={states.disableAll}
                                >
                                    {i18n.t('Edit')}
                                </Button>
                                <Button
                                    small
                                    secondary
                                    onClick={() => {
                                        menuActions.delete(row)
                                    }}
                                    disabled={states.disableAll}
                                >
                                    {i18n.t('Delete')}
                                </Button>
                            </ButtonStrip>
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
