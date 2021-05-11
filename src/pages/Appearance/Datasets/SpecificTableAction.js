import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import {
    datasetHasCategoryCombo,
    removeSettingsFromList,
    updateSettingsList,
} from './helper'
import TableActions from '../../../components/table-actions'
import DialogDelete from '../../../components/dialog/dialog-delete'
import DialogDatasetSpecificSetting from './DialogDatasetSpecificSetting'

const SpecificTableAction = ({ rows, changeRows, elementList, disableAll }) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [hasCategoryCombo, setHasCategoryCombo] = useState(false)

    const tableActions = {
        edit: (...args) => {
            setSpecificSetting(args[0])
            setHasCategoryCombo(
                datasetHasCategoryCombo(args[0].id, elementList)
            )
            setOpenEditDialog(true)
        },
        delete: (...args) => {
            setOpenDeleteDialog(true)
            setSpecificSetting(args[0])
        },
    }

    const handleDialogClose = () => {
        setOpenDeleteDialog(false)
    }

    const handleDelete = () => {
        changeRows(removeSettingsFromList(specificSetting, rows))
        setOpenDeleteDialog(false)
    }

    const handleCloseEdit = () => {
        setOpenEditDialog(false)
    }

    const handleSave = () => {
        changeRows(updateSettingsList(specificSetting, rows))
        setOpenEditDialog(false)
    }

    const handleChange = e => {
        setSpecificSetting({
            ...specificSetting,
            [e.name]: {
                filter: e.checked,
                sort: e.checked,
            },
        })
    }

    return (
        <>
            {rows.length > 0 && (
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
                        typeName={i18n.t('Dataset')}
                        name={specificSetting.name}
                    />

                    <DialogDatasetSpecificSetting
                        open={openEditDialog}
                        handleClose={handleCloseEdit}
                        dataTitle={specificSetting.name}
                        specificSettings={specificSetting}
                        handleSettings={setSpecificSetting}
                        handleSave={handleSave}
                        handleChange={handleChange}
                        hasCategoryCombo={hasCategoryCombo}
                    />
                </>
            )}
        </>
    )
}

SpecificTableAction.propTypes = {
    rows: PropTypes.array,
    changeRows: PropTypes.func,
    elementList: PropTypes.array,
    disableAll: PropTypes.bool,
}

export default SpecificTableAction
