import api from '../../utils/api'
import { GENERAL_SETTINGS, NAMESPACE } from '../../constants/data-store'
import { useCallback } from 'react'

export const useSaveGeneralSettings = ({
    generalParameters,
    openDialog,
    setOpenDialog,
    setDisableSave,
    setSubmitDataStore,
}) => {
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
            metadataSync: generalParameters.metadataSync,
            dataSync: generalParameters.dataSync,
            reservedValues: generalParameters.reservedValues,
            encryptDB: generalParameters.encryptDB,
            lastUpdated: new Date().toJSON(),
        }

        if (
            !['', null, undefined].includes(generalParameters.numberSmsToSend)
        ) {
            androidData.numberSmsToSend = generalParameters.numberSmsToSend
        }

        if (
            !['', null, undefined].includes(
                generalParameters.numberSmsConfirmation
            )
        ) {
            androidData.numberSmsConfirmation =
                generalParameters.numberSmsConfirmation
        }

        saveDataApi(androidData)
    }

    return {
        open: useCallback(() => {
            setOpenDialog({
                ...openDialog,
                saveData: true,
            })
        }),
        close: useCallback(() => {
            setOpenDialog({
                ...openDialog,
                saveData: false,
            })
        }),
        save: useCallback(() => {
            submitData()
            setOpenDialog({
                ...openDialog,
                saveData: false,
            })
            setDisableSave(true)
        }),
    }
}
