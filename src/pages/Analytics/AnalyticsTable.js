import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import TableActions from '../../components/table-actions'
import DialogDelete from '../../components/dialog/dialog-delete'
import { removeSettingsFromList } from './helper'

const AnalyticsTable = ({ rows, disableAll, handleRows }) => {
    const [specificSettings, setSpecificSettings] = useState({})
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const tableActions = {
        edit: (...arg) => {
            setSpecificSettings(arg[0])
        },
        delete: (...arg) => {
            setOpenDeleteDialog(true)
            setSpecificSettings(arg[0])
        },
    }

    const handleDelete = () => {
        handleRows(removeSettingsFromList(specificSettings, rows))
        setOpenDeleteDialog(false)
    }

    const handleDialogClose = () => {
        setOpenDeleteDialog(false)
    }

    return (
        <>
            {rows && (
                <>
                    <TableActions
                        rows={rows}
                        menuActions={tableActions}
                        states={{ disableAll }}
                    />

                    <DialogDelete
                        open={openDeleteDialog}
                        onHandleClose={handleDialogClose}
                        onHandleDelete={handleDelete}
                        typeName={i18n.t('Analytics')}
                        name={specificSettings.name}
                    />
                </>
            )}
        </>
    )
}

AnalyticsTable.propTypes = {
    rows: PropTypes.array,
    handleRows: PropTypes.func,
    disableAll: PropTypes.bool,
}

export default AnalyticsTable
