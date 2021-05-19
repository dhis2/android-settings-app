import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { AddNewSetting } from '../../../components/field'
import DialogSpecificSetting from './DialogSpecificSetting'
import {
    FULL_SPECIFIC,
    specificSettingsDefault,
    WITH_REGISTRATION,
    WITHOUT_REGISTRATION,
} from '../../../constants/program-settings'
import {
    createInitialSpecificValues,
    findProgramNameById,
    isProgramWithRegistration,
} from './helper'
import { populateProgramObject } from '../../../modules/programs/populateProgramObject'
import { parseValueByType } from '../../../modules/programs/parseValueBySettingType'
import { updateSettingsList } from '../../../utils/utils'

const NewProgramSpecific = ({ programList, rows, handleRows, disabled }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState(
        createInitialSpecificValues('')
    )
    const [programWithRegistration, setProgramType] = useState(true)
    const [disableSave, setDisableSave] = useState(true)

    const handleClose = () => {
        setSpecificSetting(createInitialSpecificValues(''))
        setOpenDialog(false)
        setDisableSave(true)
    }

    const handleSaveNew = () => {
        const name = findProgramNameById(programList, specificSetting)
        let setting = isProgramWithRegistration(programList, specificSetting.id)
            ? populateProgramObject(WITH_REGISTRATION, specificSetting)
            : populateProgramObject(WITHOUT_REGISTRATION, specificSetting)
        setting = { ...setting, name, id: specificSetting.id }
        const updatedList = updateSettingsList(setting, rows)
        handleRows(updatedList)
        handleClose()
    }

    const handleOpenSettingsDialog = () => {
        setSpecificSetting(createInitialSpecificValues(''))
        setOpenDialog(true)
    }

    const handleChange = (e, key) => {
        if (key === 'name') {
            const settings = populateProgramObject(
                FULL_SPECIFIC,
                specificSettingsDefault
            )
            setSpecificSetting({
                ...settings,
                [key]: e.selected,
                id: e.selected,
            })
            setProgramType(isProgramWithRegistration(programList, e.selected))
            setDisableSave(false)
        } else {
            const name = typeof key === 'string' ? key : e.name
            const value = typeof key === 'string' ? e.selected : e.value
            setSpecificSetting({
                ...specificSetting,
                [name]: parseValueByType(name, value),
            })
        }
    }

    return (
        <>
            {openDialog && (
                <DialogSpecificSetting
                    open={openDialog}
                    handleClose={handleClose}
                    handleChange={handleChange}
                    programOptions={programList}
                    specificSetting={specificSetting}
                    handleSubmitDialog={handleSaveNew}
                    disableSave={disableSave}
                    programWithRegistration={programWithRegistration}
                />
            )}

            <AddNewSetting
                label={i18n.t('Add a program specific setting')}
                onClick={handleOpenSettingsDialog}
                disable={disabled}
            />
        </>
    )
}

NewProgramSpecific.propTypes = {
    programList: PropTypes.array,
    rows: PropTypes.array,
    handleRows: PropTypes.func,
    completeList: PropTypes.array,
    disabled: PropTypes.bool,
}

export default NewProgramSpecific
