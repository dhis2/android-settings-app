import React from 'react'

import { ButtonStrip, Button, Card } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import cx from 'classnames'
import dataTableStyles from '../styles/DataTable.module.css'
import disableStyle from '../styles/Disable.module.css'
import tableActionStyles from '../styles/TableActions.module.css'
import Wrapper from './wrapper'

const TableActions = ({ rows, menuActions, states }) => (
    <Wrapper>
        <div>
            <TableRows rows={rows} menuActions={menuActions} states={states} />
        </div>
    </Wrapper>
)

const TableRows = ({ rows, states, menuActions }) => (
    <div>
        {rows.map(row => (
            <Card key={row.id} className={tableActionStyles.wrapper}>
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
                            {row.summarySettings}
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

TableActions.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    menuActions: PropTypes.object.isRequired,
}

export default TableActions
