import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import DialogDelete from '../../../components/dialog/DialogDelete.jsx'
import TableActions from '../../../components/TableActions.jsx'
import {
    removeSettingsFromList,
    updateSettingsList,
} from '../../../utils/utils'
import DialogDatasetSpecificSetting from './DialogDatasetSpecificSetting.jsx'
import {
    createInitialDataSetConfiguration,
    datasetHasCategoryCombo,
    isDataSetConfiguration,
} from './helper'

const SpecificTableAction = ({
    rows,
    changeRows,
    elementList,
    configurationList,
    handleConfigurationList,
    disableAll,
}) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    const [dataSetConfiguration, setDataSetConfiguration] = useState({})
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [hasCategoryCombo, setHasCategoryCombo] = useState(false)

    const tableActions = {
        edit: (...args) => {
            const parsedConfig =
                configurationList?.find((item) => item.id === args[0].id) ||
                createInitialDataSetConfiguration({})
            setSpecificSetting(args[0])
            setHasCategoryCombo(
                datasetHasCategoryCombo(args[0].id, elementList)
            )
            setDataSetConfiguration(parsedConfig)
            setOpenEditDialog(true)
        },
        delete: (...args) => {
            setOpenDeleteDialog(true)
            setSpecificSetting(args[0])
            setDataSetConfiguration(args[0])
        },
    }

    const handleDialogClose = () => {
        setOpenDeleteDialog(false)
    }

    const handleDelete = () => {
        changeRows(removeSettingsFromList(specificSetting, rows))
        handleConfigurationList(
            removeSettingsFromList(dataSetConfiguration, configurationList)
        )
        setOpenDeleteDialog(false)
    }

    const handleCloseEdit = () => {
        setOpenEditDialog(false)
    }

    const handleSave = () => {
        changeRows(updateSettingsList(specificSetting, rows))
        handleConfigurationList(
            updateSettingsList(dataSetConfiguration, configurationList)
        )
        setOpenEditDialog(false)
    }

    const handleChange = (e) => {
        if (isDataSetConfiguration(e.name)) {
            setDataSetConfiguration({
                ...dataSetConfiguration,
                [e.name]: e.checked || e.value,
                id: specificSetting.id,
                name: specificSetting.name,
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
                        typeName={i18n.t('Data set')}
                        name={specificSetting.name}
                    />

                    <DialogDatasetSpecificSetting
                        open={openEditDialog}
                        handleClose={handleCloseEdit}
                        dataTitle={specificSetting.name}
                        specificSettings={specificSetting}
                        handleSettings={setSpecificSetting}
                        handleSave={handleSave}
                        handleChange={handleChange}
                        hasCategoryCombo={hasCategoryCombo}
                        dataSetConfiguration={dataSetConfiguration}
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
    disableAll: PropTypes.bool,
}

export default SpecificTableAction
