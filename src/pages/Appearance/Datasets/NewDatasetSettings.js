import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import DialogDatasetSpecificSetting from './DialogDatasetSpecificSetting'
import { AddNewSetting } from '../../../components/field'
import {
    createInitialSpecificValues,
    createInitialValues,
    datasetHasCategoryCombo,
} from './helper'
import { updateSettingsList } from '../../../utils/utils'

const NewDatasetSettings = ({ datasetList, rows, handleRows, disabled }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [hasCategoryCombo, setCategoryCombo] = useState(false)
    const [specificSettings, setSpecificSettings] = useState(
        createInitialSpecificValues('')
    )
    const [disableSave, setDisableSave] = useState(true)

    const handleOpenSettingsDialog = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
        setSpecificSettings(createInitialSpecificValues(''))
        setDisableSave(true)
    }

    const handleSaveNew = () => {
        handleRows(updateSettingsList(specificSettings, rows))
        handleClose()
    }

    const getDatasetName = dataset => {
        const datasetFilter = datasetList.filter(
            option => option.id === dataset
        )
        return datasetFilter[0].name
    }

    const handleChange = (e, key) => {
        if (typeof key === 'string') {
            const settings = datasetHasCategoryCombo(e.selected, datasetList)
                ? createInitialSpecificValues('')
                : createInitialValues('')
            setSpecificSettings({
                ...settings,
                name: getDatasetName(e.selected),
                id: e.selected,
            })
            setCategoryCombo(datasetHasCategoryCombo(e.selected, datasetList))
            setDisableSave(false)
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

    return (
        <>
            <AddNewSetting
                label={i18n.t('Add a Data set Settings')}
                onClick={handleOpenSettingsDialog}
                disable={disabled}
            />

            <DialogDatasetSpecificSetting
                open={openDialog}
                handleClose={handleClose}
                dataOptions={datasetList}
                specificSettings={specificSettings}
                handleSave={handleSaveNew}
                handleChange={handleChange}
                hasCategoryCombo={hasCategoryCombo}
                disableSave={disableSave}
            />
        </>
    )
}

NewDatasetSettings.propTypes = {
    datasetList: PropTypes.array,
    rows: PropTypes.array,
    handleRows: PropTypes.func,
    disabled: PropTypes.bool,
}

export default NewDatasetSettings
