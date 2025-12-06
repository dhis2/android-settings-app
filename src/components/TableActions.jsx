import i18n from '@dhis2/d2-i18n'
import { ButtonStrip, Button, Card } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import dataTableStyles from '../styles/DataTable.module.css'
import disableStyle from '../styles/Disable.module.css'
import tableActionStyles from '../styles/TableActions.module.css'
import Wrapper from './Wrapper.jsx'

const TableActions = ({ rows, menuActions, states }) => {
    return (
        <Wrapper>
            <div>
                <TableRows
                    rows={rows}
                    menuActions={menuActions}
                    states={states}
                />
            </div>
        </Wrapper>
    )
}

TableActions.propTypes = {
    rows: PropTypes.array.isRequired,
    menuActions: PropTypes.object.isRequired,
    states: PropTypes.object.isRequired,
}

const TableRows = ({ rows, states, menuActions }) => (
    <div>
        {rows.map((row) => (
            <Card key={row.id || row.uid} className={tableActionStyles.wrapper}>
                <div className={tableActionStyles.parent}>
                    <div>
                        <div
                            className={cx(tableActionStyles.title, {
                                [disableStyle.disable_label]: states.disableAll,
                            })}
                        >
                            {row.name}
                        </div>
                        <div
                            className={cx(
                                tableActionStyles.subtitle,
                                dataTableStyles.dataTable_row_title,
                                {
                                    [disableStyle.disable_label]:
                                        states.disableAll,
                                }
                            )}
                        >
                            {row.summarySettings ?? row.description}
                        </div>
                    </div>

                    <div>
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
                    </div>
                </div>
            </Card>
        ))}
    </div>
)

TableRows.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            uid: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            summarySettings: PropTypes.string,
        })
    ),
    menuActions: PropTypes.shape({
        edit: PropTypes.func.isRequired,
        delete: PropTypes.func.isRequired,
    }),
    states: PropTypes.shape({
        disableAll: PropTypes.bool,
    }),
}

export default TableActions
