import { CircularLoader, Button } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import TableActions from '../../components/TableActions'
import DialogCustomIntents from './DialogCustomIntents'
import DialogDelete from '../../components/dialog/DialogDelete'

const getDefaultForm = () => ({
    name: '',
    trigger: { dataElements: [], attributes: [] },
    action: [],
    packageName: '',
    request: { arguments: {} },
    response: { data: {} },
})

// Mock data for dataElements and attributes
const mockDataElements = [
    { id: 'de1', displayName: 'Data Element 1' },
    { id: 'de2', displayName: 'Data Element 2' },
]

const mockAttributes = [
    { id: 'attr1', displayName: 'Tracked Entity Attribute 1' },
    { id: 'attr2', displayName: 'Tracked Entity Attribute 2' },
]

const CustomIntentsList = ({ settings, handleSettings, disable }) => {
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [specificSettings, setSpecificSettings] = useState({})
    const [formData, setFormData] = useState(getDefaultForm)

    // Pass down the mock data for data elements and attributes
    const [dataElements] = useState(mockDataElements)
    const [attributes] = useState(mockAttributes)

    useEffect(() => {
        console.log('Updated formData:', formData)
    }, [formData])
    

    useEffect(() => {
        if (open) {
            setFormData({
                ...getDefaultForm(),
                ...specificSettings,
                trigger: {
                    dataElements: specificSettings?.trigger?.dataElements || [],
                    attributes: specificSettings?.trigger?.attributes || [],
                },
                request: {
                    arguments: specificSettings?.request?.arguments || {},
                },
                response: {
                    data: specificSettings?.response?.data || {},
                },
            })
        }
    }, [open, specificSettings])

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
            if (idx > -1) updated[idx] = newIntent
        } else {
            updated.push({ ...newIntent, uid: crypto.randomUUID() })
        }
        handleSettings(updated)
        setOpenEditDialog(false)
    }
    const handleChange = (updatedSettings) => {
        setSpecificSettings(updatedSettings)
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

            <Button onClick={openAddDialog}>{i18n.t('Add Intent')}</Button>

            <DialogCustomIntents
                open={openEditDialog}
                handleClose={handleDialogClose}
                handleSave={handleSave}
                formData={formData}
                setFormData={setFormData}
                setSpecificSettings={setSpecificSettings}
                handleChange={handleChange} 
                edit={!!specificSettings.uid}
                dataElements={dataElements}
                attributes={attributes}
            />
        </>
    )
}

CustomIntentsList.propTypes = {
    settings: PropTypes.array.isRequired,
    handleSettings: PropTypes.func.isRequired,
    disable: PropTypes.bool.isRequired,
}



// TODO: create actions functions (delete and edit)
const RowList = ({ rows, disable, setSpecificSettings, openEditDialog, handleSettings }) => {
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
            const updatedRows = rows.filter((item) => item.uid !== deleteItem.uid)
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
                    typeName="Intent"
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
