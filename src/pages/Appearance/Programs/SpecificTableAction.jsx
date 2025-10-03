import i18n from '@dhis2/d2-i18n'
import isNil from 'lodash/isNil'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import DialogDelete from '../../../components/dialog/DialogDelete.jsx'
import TableActions from '../../../components/TableActions.jsx'
import {
    removeSettingsFromList,
    updateSettingsList,
} from '../../../utils/utils'
import DialogNewProgram from './DialogNewProgram.jsx'
import {
    createSettings,
    findElementById,
    isProgramConfiguration,
    isTrackerProgram,
    programHasCategoryCombo,
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
    const [isTracker, setTrackerProgram] = useState(false)

    const tableActions = {
        edit: (...args) => {
            setSpecificSetting(args[0])
            setHasCategoryCombo(
                programHasCategoryCombo(args[0].id, elementList)
            )
            setTrackerProgram(isTrackerProgram(args[0].id, elementList))
            setSpinner(createSettings(findElementById(spinnerList, args[0].id)))
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

    const handleChange = (e, key) => {
        if (isProgramConfiguration(e.name || key)) {
            const spinnerSettings = !isNil(e.name)
                ? { ...spinner, [e.name]: e.checked || e.value }
                : { ...spinner, [key]: e.selected }

            setSpinner({
                ...spinnerSettings,
                id: specificSetting.id,
            })
        } else {
            setSpecificSetting({
                ...specificSetting,
                [e.name]: {
                    filter: e.checked,
                    sort: e.checked,
                },
            })
        }
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
                        isTrackerProgram={isTracker}
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
