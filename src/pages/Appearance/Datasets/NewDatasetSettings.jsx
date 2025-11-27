import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { AddNewSetting } from '../../../components/field'
import { updateSettingsList } from '../../../utils/utils'
import DialogDatasetSpecificSetting from './DialogDatasetSpecificSetting.jsx'
import {
    createInitialDataSetConfiguration,
    createInitialSpecificValues,
    createInitialValues,
    datasetHasCategoryCombo,
    isDataSetConfiguration,
} from './helper'

const NewDatasetSettings = ({
    datasetList,
    rows,
    handleRows,
    configurationList,
    handleConfigurationList,
    disabled,
}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [hasCategoryCombo, setHasCategoryCombo] = useState(false)
    const [specificSettings, setSpecificSettings] = useState(
        createInitialSpecificValues('')
    )
    const [dataSetConfiguration, setDataSetConfiguration] = useState(
        createInitialDataSetConfiguration({})
    )
    const [disableSave, setDisableSave] = useState(true)

    const handleOpenSettingsDialog = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
        setSpecificSettings(createInitialSpecificValues(''))
        setDataSetConfiguration(createInitialDataSetConfiguration({}))
        setDisableSave(true)
    }

    const handleSaveNew = () => {
        handleRows(updateSettingsList(specificSettings, rows))
        handleConfigurationList(
            updateSettingsList(dataSetConfiguration, configurationList)
        )
        handleClose()
    }

    const getDatasetName = (dataset) => {
        const datasetFilter = datasetList.filter(
            (option) => option.id === dataset
        )
        return datasetFilter[0].name
    }

    const handleChange = (e, key) => {
        if (typeof key === 'string') {
            const hasCC = datasetHasCategoryCombo(e.selected, datasetList)
            const datasetName = getDatasetName(e.selected)

            const settings = hasCC
                ? createInitialSpecificValues('')
                : createInitialValues('')

            setSpecificSettings({
                ...settings,
                name: datasetName,
                id: e.selected,
            })
            setDataSetConfiguration({
                ...createInitialDataSetConfiguration({}),
                name: datasetName,
                id: e.selected,
            })
            setHasCategoryCombo(hasCC)
            setDisableSave(false)
            return
        }

        if (isDataSetConfiguration(e.name || key)) {
            setDataSetConfiguration({
                ...dataSetConfiguration,
                [e.name]: e.checked || e.value,
                id: specificSettings.id,
                name: specificSettings.name,
            })
            return
        }

        // Handle filter
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
                dataSetConfiguration={dataSetConfiguration}
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
    configurationList: PropTypes.array,
    handleConfigurationList: PropTypes.func,
}

export default NewDatasetSettings
