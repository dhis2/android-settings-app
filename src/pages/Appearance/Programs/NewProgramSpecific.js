import i18n from '@dhis2/d2-i18n'
import isNil from 'lodash/isNil'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { AddNewSetting } from '../../../components/field'
import { updateSettingsList } from '../../../utils/utils'
import DialogNewProgram from './DialogNewProgram'
import {
    createInitialSpecificValues,
    createInitialSpinnerValue,
    createInitialValues,
    getProgramName,
    isProgramConfiguration,
    isTrackerProgram,
    programHasCategoryCombo,
} from './helper'

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
    const [spinner, setSpinner] = useState(createInitialSpinnerValue({}))
    const [disableSave, setDisableSave] = useState(true)
    const [isTracker, setTrackerProgram] = useState(false)

    const handleOpenSettingsDialog = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
        setSpecificSettings(createInitialSpecificValues(''))
        setSpinner(createInitialSpinnerValue({}))
        setDisableSave(true)
    }

    const handleSaveNew = () => {
        handleRows(updateSettingsList(specificSettings, rows))
        onChangeSpinnerList(updateSettingsList(spinner, spinnerList))
        handleClose()
    }

    const handleChange = (e, key) => {
        if (key === 'id') {
            const states = programHasCategoryCombo(e.selected, programList)
                ? createInitialSpecificValues('')
                : createInitialValues('')
            setSpecificSettings({
                ...states,
                name: getProgramName(e.selected, programList),
                id: e.selected,
            })
            setSpinner({
                ...createInitialSpinnerValue({}),
                id: e.selected,
                name: getProgramName(e.selected, programList),
            })
            setCategoryCombo(programHasCategoryCombo(e.selected, programList))
            setTrackerProgram(isTrackerProgram(e.selected, programList))
            setDisableSave(false)
        } else {
            if (isProgramConfiguration(e.name || key)) {
                const spinnerSettings = !isNil(e.name)
                    ? { ...spinner, [e.name]: e.checked || e.value }
                    : { ...spinner, [key]: e.selected }

                setSpinner({
                    ...spinnerSettings,
                    [e.name]: e.checked || e.value,
                    id: specificSettings.id,
                    name: specificSettings.name,
                })
            } else {
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
                    isTrackerProgram={isTracker}
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
