import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import DialogDelete from '../../components/dialog/DialogDelete'
import { AddNewSetting } from '../../components/field'
import TableActions from '../../components/TableActions'
import { generateDhis2Id } from '../../utils/generateId'
import DialogCustomIntents from './DialogCustomIntents'

const combinedQuery = {
    dataElements: {
        resource: 'dataElements',
        params: {
            fields: 'id,displayName,valueType',
            paging: false,
            filter: 'valueType:in:[TEXT,LONG_TEXT]',
        },
    },
    attributes: {
        resource: 'trackedEntityAttributes',
        params: {
            fields: 'id,displayName,valueType',
            paging: false,
            filter: 'valueType:in:[TEXT,LONG_TEXT]',
        },
    },
}

const CustomIntentsList = ({ settings, handleSettings, disable }) => {
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [specificSettings, setSpecificSettings] = useState({})

    const { loading, data } = useDataQuery(combinedQuery)

    const dataElements = data?.dataElements?.dataElements || []
    const attributes = data?.attributes?.trackedEntityAttributes || []

    const openAddDialog = () => {
        setSpecificSettings({})
        setOpenEditDialog(true)
    }

    const handleDialogClose = () => {
        setOpenEditDialog(false)
    }

    const handleSave = (newIntent) => {
        const updated = [...settings]
        if (newIntent.uid) {
            const idx = updated.findIndex((s) => s.uid === newIntent.uid)
            if (idx > -1) {
                updated[idx] = newIntent
            }
        } else {
            updated.push({ ...newIntent, uid: generateDhis2Id() })
        }
        handleSettings(updated)
        setOpenEditDialog(false)
    }
    const handleChange = (updatedSettings) => {
        setSpecificSettings(updatedSettings)
    }

    if (loading) {
        return <CircularLoader />
    }

    return (
        <>
            {settings.length > 0 && (
                <RowList
                    rows={settings}
                    disable={disable}
                    setSpecificSettings={setSpecificSettings}
                    openEditDialog={setOpenEditDialog}
                    handleSettings={handleSettings}
                />
            )}

            <AddNewSetting
                label={i18n.t('Add intent')}
                onClick={openAddDialog}
            />

            {openEditDialog && (
                <DialogCustomIntents
                    open={openEditDialog}
                    handleClose={handleDialogClose}
                    handleSave={handleSave}
                    setSpecificSettings={setSpecificSettings}
                    handleChange={handleChange}
                    edit={!!specificSettings.uid}
                    dataElements={dataElements}
                    attributes={attributes}
                    specificSettings={specificSettings}
                />
            )}
        </>
    )
}

CustomIntentsList.propTypes = {
    settings: PropTypes.array.isRequired,
    handleSettings: PropTypes.func.isRequired,
    disable: PropTypes.bool.isRequired,
}

const RowList = ({
    rows,
    disable,
    setSpecificSettings,
    openEditDialog,
    handleSettings,
}) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [deleteItem, setDeleteItem] = useState(null)

    const menuActions = {
        edit: (row) => {
            setSpecificSettings(row)
            openEditDialog(true)
        },
        delete: (row) => {
            setDeleteItem(row)
            setOpenDeleteDialog(true)
        },
    }

    const handleDelete = () => {
        if (deleteItem) {
            const updatedRows = rows.filter(
                (item) => item.uid !== deleteItem.uid
            )
            handleSettings(updatedRows)
            setOpenDeleteDialog(false)
        }
    }

    return (
        <>
            <TableActions
                rows={rows}
                menuActions={menuActions}
                states={disable}
            />

            {openDeleteDialog && deleteItem && (
                <DialogDelete
                    open={openDeleteDialog}
                    onHandleClose={() => setOpenDeleteDialog(false)}
                    name={deleteItem.name}
                    typeName={i18n.t('Custom Intent')}
                    onHandleDelete={handleDelete}
                />
            )}
        </>
    )
}

RowList.propTypes = {
    rows: PropTypes.array,
    disable: PropTypes.bool,
    setSpecificSettings: PropTypes.func.isRequired,
    openEditDialog: PropTypes.func.isRequired,
    handleSettings: PropTypes.func.isRequired,
}

export default CustomIntentsList
