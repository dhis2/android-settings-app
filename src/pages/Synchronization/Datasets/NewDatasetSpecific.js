import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { AddNewSetting } from '../../../components/field'
import DialogSpecificSettings from './DialogSpecificSettings'
import {
    createInitialSpecificValues,
    createInitialValues,
    findDatasetName,
    getPeriodType,
} from './helper'
import { parseValueBySettingType } from './parseValueBySettingType'
import { updateSettingsList } from '../../../utils/utils'

const NewDatasetSpecific = ({ datasetList, rows, handleRows, disabled }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState(
        createInitialValues('')
    )
    const [disableSave, setDisableSave] = useState(true)
    const [periodType, setPeriodType] = useState()

    const handleClose = () => {
        setSpecificSetting(createInitialValues(''))
        setOpenDialog(false)
        setDisableSave(true)
    }

    const handleOpenSettingsDialog = () => {
        setSpecificSetting(createInitialValues(''))
        setOpenDialog(true)
    }

    const handleChange = (e, key) => {
        if (key === 'name') {
            const periodTypeName =
                getPeriodType(e.selected, datasetList).name ||
                getPeriodType(e.selected, datasetList)
            const settings = createInitialSpecificValues('', periodTypeName)
            setPeriodType(periodTypeName)
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
