import i18n from '@dhis2/d2-i18n'
import isNil from 'lodash/isNil'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { AddNewSetting } from '../../../components/field'
import { updateSettingsList } from '../../../utils/utils'
import DialogNewProgram from './DialogNewProgram.jsx'
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
    const [hasCategoryCombo, setHasCategoryCombo] = useState(false)
    const [specificSettings, setSpecificSettings] = useState(
        createInitialSpecificValues('')
    )
    const [spinner, setSpinner] = useState(createInitialSpinnerValue({}))
    const [disableSave, setDisableSave] = useState(true)
    const [isTracker, setIsTracker] = useState(false)

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
            const hasCC = programHasCategoryCombo(e.selected, programList)
            const programName = getProgramName(e.selected, programList)

            const states = hasCC
                ? createInitialSpecificValues('')
                : createInitialValues('')

            setSpecificSettings({
                ...states,
                name: programName,
                id: e.selected,
            })
            setSpinner({
                ...createInitialSpinnerValue({}),
                id: e.selected,
                name: programName,
            })
            setHasCategoryCombo(hasCC)
            setIsTracker(isTrackerProgram(e.selected, programList))
            setDisableSave(false)
            return
        }

        if (isProgramConfiguration(e.name || key)) {
            const hasName = !isNil(e.name)
            const spinnerSettings = hasName
                ? { ...spinner, [e.name]: e.checked ?? e.value }
                : { ...spinner, [key]: e.selected }

            setSpinner({
                ...spinnerSettings,
                [e.name]: e.checked ?? e.value,
                id: specificSettings.id,
                name: specificSettings.name,
            })
            return
        }

        // Handle filter toggles
        setSpecificSettings({
            ...specificSettings,
            [e.name]: {
                filter: e.checked,
                sort: e.checked,
            },
        })
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
