import api from '../../utils/api'
import { GENERAL_SETTINGS, NAMESPACE } from '../../constants/data-store'
import { useState } from 'react'

export const useSaveGeneralSettings = ({ form, setSubmitDataStore }) => {
    const { fields, setDisableSave } = form
    const [openDialog, setOpenDialog] = useState({
        saveData: false,
        disableSettings: false,
    })

    /**
     * Handle update api method to save settings in dataStore also shows alertBar for success and error
     * */
    const saveDataApi = data => {
        api.updateValue(NAMESPACE, GENERAL_SETTINGS, data)
            .then(() => {
                setSubmitDataStore({
                    success: true,
                    error: false,
                })
            })
            .catch(e => {
                console.error(e)
                setSubmitDataStore({
                    success: false,
                    error: true,
                })
            })
    }

    /**
     * Updates Settings calling update api,
     * check if gateway and confirmation number are not empty
     * Prevent null console warning
     */
    const submitData = () => {
        const androidData = {
            metadataSync: fields.metadataSync,
            dataSync: fields.dataSync,
            reservedValues: fields.reservedValues,
            encryptDB: fields.encryptDB,
            lastUpdated: new Date().toJSON(),
        }

        if (!['', null, undefined].includes(fields.numberSmsToSend)) {
            androidData.numberSmsToSend = fields.numberSmsToSend
        }

        if (!['', null, undefined].includes(fields.numberSmsConfirmation)) {
            androidData.numberSmsConfirmation = fields.numberSmsConfirmation
        }

        saveDataApi(androidData)
    }

    return {
        handleSaveDataDialog: {
            open: () => {
                setOpenDialog({
                    ...openDialog,
                    saveData: true,
                })
            },
            close: () => {
                setOpenDialog({
                    ...openDialog,
                    saveData: false,
                })
            },
            save: () => {
                submitData()
                setOpenDialog({
                    ...openDialog,
                    saveData: false,
                })
                setDisableSave(true)
            },
        },
        setOpenDialog,
        openDialog,
    }
}
