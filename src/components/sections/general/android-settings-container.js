import React, { useEffect, useState } from 'react'

import { CircularLoader } from '@dhis2/ui-core'
import GeneralSettings from './general-settings'
import UnsavedChangesAlert from '../../unsaved-changes-alert'
import { apiLoadGeneralSettings } from '../../../modules/general/apiLoadSettings'
import { removeNamespace } from '../../../modules/general/removeNamespace'
import { useNavigation } from '../../../utils/useNavigation'
import { useGeneralForm } from '../../../modules/general/useGeneralForm'
import { useSaveGeneralSettings } from '../../../modules/general/useSaveGeneralSettings'

const AndroidSettingsContainer = () => {
    const [submitDataStore, setSubmitDataStore] = useState({
        success: false,
        error: false,
    })
    const [openDialog, setOpenDialog] = useState({
        encryptDB: false,
        saveData: false,
        disableSettings: false,
    })
    const [loading, setLoading] = useState(true)
    const [openErrorAlert, setOpenErrorAlert] = useState(false)
    const { reloadPage, navigateTo } = useNavigation()
    const {
        handleChange,
        handleReset,
        handleCheckbox,
        validatePhoneNumber,
        generalParameters,
        setGeneralParameters,
        errorNumber,
        disableSave,
        setDisableSave,
    } = useGeneralForm({
        setOpenDialog,
        setOpenErrorAlert,
        openDialog,
        setSubmitDataStore,
    })
    const handleSaveDataDialog = useSaveGeneralSettings({
        generalParameters,
        openDialog,
        setOpenDialog,
        setDisableSave,
        setSubmitDataStore,
    })

    /**
     * When component mount, get namespace and keys from dataStore
     */
    useEffect(() => {
        apiLoadGeneralSettings()
            .then(generalSettings => {
                if (generalSettings) {
                    setGeneralParameters(generalSettings)
                    setLoading(false)
                    setDisableSave(true)
                } else {
                    navigateTo('/')
                }
            })
            .catch(e => {
                console.error(e)
                setLoading(false)
                setOpenErrorAlert(true)
            })
    }, [])

    /**
     * Methods to handle Dialog that disable/remove settings
     * open: flag to open dialog
     * cancel: flag to close dialog
     * disableSettings: method to remove namespace and keyNames
     * */

    const handleDisableSettings = {
        open: () => {
            setOpenDialog({
                ...openDialog,
                disableSettings: true,
            })
        },
        cancel: () => {
            setOpenDialog({
                ...openDialog,
                disableSettings: false,
            })
        },
        disableSettings: () => {
            removeNamespace()
                .then(() => {
                    console.info('remove namespace')
                    reloadPage()
                })
                .catch(e => {
                    console.error(e)
                })
        },
    }

    if (loading === true) {
        return <CircularLoader small />
    }

    return (
        <>
            <UnsavedChangesAlert unsavedChanges={!disableSave} />

            <GeneralSettings
                state={{
                    generalParameters,
                    loading,
                    errorNumber,
                    openDialog,
                    disableSave,
                    submitDataStore,
                    openErrorAlert,
                }}
                handleChange={handleChange}
                validatePhoneNumber={validatePhoneNumber}
                handleReset={handleReset}
                handleEncryptCheckbox={handleCheckbox}
                handleSaveDialog={handleSaveDataDialog}
                handleDisableSettings={handleDisableSettings}
            />
        </>
    )
}

export default AndroidSettingsContainer
