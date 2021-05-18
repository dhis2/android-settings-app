import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { AddNewSetting } from '../../../components/field'
import DialogSpecificSettings from './DialogSpecificSettings'
import { populateSettingObject } from '../../../modules/dataset/populateSettingObject'
import {
    CLEAN,
    DEFAULT,
    SPECIFIC_SETTINGS,
} from '../../../constants/data-set-settings'
import { findDatasetName, getPeriodType, updateSettingsList } from './helper'
import { parseValueBySettingType } from '../../../modules/dataset/parseValueBySettingType'

const NewDatasetSpecific = ({ datasetList, rows, handleRows, disabled }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState(
        populateSettingObject(CLEAN)
    )
    const [disableSave, setDisableSave] = useState(true)
    const [periodType, setPeriodType] = useState()

    const handleOpenSettingsDialog = () => {
        setSpecificSetting(populateSettingObject(DEFAULT))
        setOpenDialog(true)
    }

    const handleChange = (e, key) => {
        if (key === 'name') {
            const settings = populateSettingObject(
                SPECIFIC_SETTINGS,
                specificSetting,
                getPeriodType(e.selected, datasetList).name
            )
            setPeriodType(getPeriodType(e.selected, datasetList).name)
            setSpecificSetting({
                ...settings,
                [key]: e.selected,
                id: e.selected,
            })
            setDisableSave(false)
        } else {
            setSpecificSetting({
                ...specificSetting,
                [e.name]: parseValueBySettingType(e.name, e.value),
            })
        }
    }

    const handleSave = () => {
        const name = findDatasetName(datasetList, specificSetting)
        const settings = { ...specificSetting, name }
        const updatedList = updateSettingsList(settings, rows)
        handleRows(updatedList)
        handleClose()
    }

    const handleClose = () => {
        setSpecificSetting(populateSettingObject(CLEAN))
        setOpenDialog(false)
        setDisableSave(true)
    }

    return (
        <>
            <AddNewSetting
                label={i18n.t('Add a data set specific setting')}
                onClick={handleOpenSettingsDialog}
                disable={disabled}
            />

            {openDialog && (
                <DialogSpecificSettings
                    open={openDialog}
                    handleClose={handleClose}
                    periodType={periodType}
                    handleChange={handleChange}
                    datasetOptions={datasetList}
                    specificSetting={specificSetting}
                    handleSubmitDialog={handleSave}
                    disableSave={disableSave}
                />
            )}
        </>
    )
}

NewDatasetSpecific.propTypes = {
    datasetList: PropTypes.array,
    rows: PropTypes.array,
    handleRows: PropTypes.func,
    disabled: PropTypes.bool,
}

export default NewDatasetSpecific
