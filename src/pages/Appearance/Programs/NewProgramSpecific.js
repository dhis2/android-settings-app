import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { AddNewSetting } from '../../../components/field'
import {
    createInitialSpecificValues,
    createInitialSpinnerValue,
    createInitialValues,
    getProgramName,
    programHasCategoryCombo,
    updateSettingsList,
} from './helper'
import DialogNewProgram from './DialogNewProgram'

const NewProgramSpecific = ({
    programList,
    rows,
    handleRows,
    spinnerList,
    onChangeSpinnerList,
    disabled,
}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [hasCategoryCombo, setCategoryCombo] = useState(false)
    const [specificSettings, setSpecificSettings] = useState(
        createInitialSpecificValues('')
    )
    const [spinner, setSpinner] = useState(createInitialSpinnerValue(''))
    const [disableSave, setDisableSave] = useState(true)

    const handleOpenSettingsDialog = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
        setSpecificSettings(createInitialSpecificValues(''))
        setSpinner(createInitialSpinnerValue(''))
        setDisableSave(true)
    }

    const handleSaveNew = () => {
        handleRows(updateSettingsList(specificSettings, rows))
        onChangeSpinnerList(updateSettingsList(spinner, spinnerList))
        handleClose()
    }

    const handleChange = (e, key) => {
        if (typeof key === 'string') {
            const states = programHasCategoryCombo(e.selected, programList)
                ? createInitialSpecificValues('')
                : createInitialValues('')
            setSpecificSettings({
                ...states,
                name: getProgramName(e.selected, programList),
                id: e.selected,
            })
            setSpinner({
                ...createInitialSpinnerValue(''),
                id: e.selected,
                name: getProgramName(e.selected, programList),
            })
            setCategoryCombo(programHasCategoryCombo(e.selected, programList))
            setDisableSave(false)
        } else {
            if (e.name === 'visible') {
                setSpinner({
                    [e.name]: e.checked,
                    id: specificSettings.id,
                    name: specificSettings.name,
                })
            } else {
                setSpinner({
                    ...spinner,
                    id: specificSettings.id,
                    name: specificSettings.name,
                })
                setSpecificSettings({
                    ...specificSettings,
                    [e.name]: {
                        filter: e.checked,
                        sort: e.checked,
                    },
                })
            }
        }
    }

    return (
        <>
            <AddNewSetting
                label={i18n.t('Add a Program Settings')}
                onClick={handleOpenSettingsDialog}
                disable={disabled}
            />

            {openDialog && (
                <DialogNewProgram
                    open={openDialog}
                    handleClose={handleClose}
                    handleChange={handleChange}
                    dataOptions={programList}
                    specificSettings={specificSettings}
                    handleSave={handleSaveNew}
                    hasCategoryCombo={hasCategoryCombo}
                    spinnerSettings={spinner}
                    disableSave={disableSave}
                />
            )}
        </>
    )
}

NewProgramSpecific.propTypes = {
    programList: PropTypes.array,
    rows: PropTypes.array,
    handleRows: PropTypes.func,
    spinnerList: PropTypes.array,
    onChangeSpinnerList: PropTypes.func,
    disabled: PropTypes.bool,
}

export default NewProgramSpecific
