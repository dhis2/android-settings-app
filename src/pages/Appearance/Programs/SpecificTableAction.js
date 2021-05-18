import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import TableActions from '../../../components/table-actions'
import DialogDelete from '../../../components/dialog/dialog-delete'
import DialogNewProgram from './DialogNewProgram'
import {
    programHasCategoryCombo,
    removeSettingsFromList,
    updateSettingsList,
} from './helper'

const SpecificTableAction = ({
    rows,
    changeRows,
    elementList,
    spinnerList,
    onChangeSpinnerList,
    disableAll,
}) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [hasCategoryCombo, setHasCategoryCombo] = useState(false)
    const [spinner, setSpinner] = useState({})

    const tableActions = {
        edit: (...args) => {
            setSpecificSetting(args[0])
            setHasCategoryCombo(
                programHasCategoryCombo(args[0].id, elementList)
            )
            setSpinner(spinnerList.find(setting => setting.id === args[0].id))
            setOpenEditDialog(true)
        },
        delete: (...args) => {
            setOpenDeleteDialog(true)
            setSpecificSetting(args[0])
            setSpinner(args[0])
        },
    }

    const handleDialogClose = () => {
        setOpenDeleteDialog(false)
    }

    const handleDelete = () => {
        changeRows(removeSettingsFromList(specificSetting, rows))
        onChangeSpinnerList(removeSettingsFromList(spinner, spinnerList))
        setOpenDeleteDialog(false)
    }

    const handleCloseEdit = () => {
        setOpenEditDialog(false)
    }

    const handleSave = () => {
        changeRows(updateSettingsList(specificSetting, rows))
        onChangeSpinnerList(updateSettingsList(spinner, spinnerList))
        handleCloseEdit()
    }

    const handleChange = e => {
        e.name === 'visible'
            ? setSpinner({
                  [e.name]: e.checked,
                  id: specificSetting.id,
              })
            : setSpecificSetting({
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
                        typeName={i18n.t('Program')}
                        name={specificSetting.name}
                    />

                    <DialogNewProgram
                        open={openEditDialog}
                        handleClose={handleCloseEdit}
                        programTitle={specificSetting.name}
                        specificSettings={specificSetting}
                        handleSettings={setSpecificSetting}
                        handleSave={handleSave}
                        handleChange={handleChange}
                        hasCategoryCombo={hasCategoryCombo}
                        spinnerSettings={spinner}
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
    spinnerList: PropTypes.array,
    onChangeSpinnerList: PropTypes.func,
    disableAll: PropTypes.bool,
}

export default SpecificTableAction
