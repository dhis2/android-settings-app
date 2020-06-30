import React, { useEffect, useState } from 'react'

import { CircularLoader } from '@dhis2/ui-core'
import api from '../../../utils/api'

import {
    androidSettingsDefault,
    maxValues,
    RESERVED_VALUES,
} from '../../../constants/android-settings'
import GeneralSettings from './general-settings'
import { NAMESPACE, GENERAL_SETTINGS } from '../../../constants/data-store'
import UnsavedChangesAlert from '../../unsaved-changes-alert'
import { apiLoadGeneralSettings } from '../../../modules/general/apiLoadSettings'
import { validateNumber } from '../../../modules/general/validatePhoneNumber'
import { removeNamespace } from '../../../modules/general/removeNamespace'
//import { GENERAL_SETTINGS } from '../../../constants/data-store'
import { apiUpdateDataStore } from '../../../modules/apiUpdateDataStore'
import { useNavigation } from '../../../utils/useNavigation'
import { useGeneralForm } from '../../../modules/general/useGeneralForm'
import { useSaveGeneralSettings } from '../../../modules/general/useSaveGeneralSettings'

const {
    metadataSync,
    dataSync,
    encryptDB,
    reservedValues,
} = androidSettingsDefault

const AndroidSettingsContainer = () => {
    const [submitDataStore, setSubmitDataStore] = useState({
        success: false,
        error: false,
    })

    const [loading, setLoading] = useState(true)
    const [openErrorAlert, setOpenErrorAlert] = useState(false)
    const { reloadPage, navigateTo } = useNavigation()
    const form = useGeneralForm({ setSubmitDataStore })
    const {
        handleSaveDataDialog,
        setOpenDialog,
        openDialog,
    } = useSaveGeneralSettings({
        form,
        setSubmitDataStore,
    })

    //disableAll: false,

    /**
     * When component mount, get namespace and keys from dataStore
     */

    useEffect(() => {
        apiLoadGeneralSettings()
            .then(generalSettings => {
                if (generalSettings) {
                    form.setInitialData(generalSettings)
                    setLoading(false)
                    // disableSave: true,
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
     * Updates global settings on fly
     */
    /*const handleChange = e => {
        e.preventDefault()

        let { value } = e.target

        if (e.target.name === RESERVED_VALUES) {
            value = Math.min(maxValues.reservedValues, parseInt(value))
        }

        this.setState({
            ...this.state,
            disableSave:
                this.state.errorGateway || this.state.errorConfirmation,
            submitDataStore: {
                success: false,
                error: false,
            },
            [e.target.name]: value,
        })
    }*/

    /**
     * Checks if sms number or confirmation number is valid
     */
    /*const validatePhoneNumber = {
        gatewayNumber: () => {
            if (![null, '', false].includes(this.state.numberSmsToSend)) {
                const validInput = validateNumber(this.state.numberSmsToSend)
                !validInput
                    ? this.setState({ errorGateway: true, disableSave: true })
                    : this.setState({ errorGateway: false })
            } else {
                this.setState({ errorGateway: false })
            }
        },
        confirmationNumber: () => {
            if (![null, '', false].includes(this.state.numberSmsConfirmation)) {
                const validInput = validateNumber(
                    this.state.numberSmsConfirmation
                )
                !validInput
                    ? this.setState({
                          errorConfirmation: true,
                          disableSave: true,
                      })
                    : this.setState({ errorConfirmation: false })
            } else {
                this.setState({ errorConfirmation: false })
            }
        },
    }*/

    /**
     * Updates Settings calling update api,
     * check if gateway and confirmation number are not empty
     * Prevent null console warning
     */
    /*const submitData = () => {
        const androidData = {
            metadataSync: this.state.metadataSync,
            dataSync: this.state.dataSync,
            reservedValues: this.state.reservedValues,
            encryptDB: this.state.encryptDB,
            lastUpdated: new Date().toJSON(),
        }

        if (!['', null, undefined].includes(this.state.numberSmsToSend)) {
            androidData.numberSmsToSend = this.state.numberSmsToSend
        }

        if (!['', null, undefined].includes(this.state.numberSmsConfirmation)) {
            androidData.numberSmsConfirmation = this.state.numberSmsConfirmation
        }

        this.saveDataApi(androidData)
    }*/

    /**
     * Handle update api method to save settings in dataStore also shows alertBar for success and error
     * */
    /*const saveDataApi = data => {
        //api.updateValue(NAMESPACE, GENERAL_SETTINGS, data)
        apiUpdateDataStore(data, GENERAL_SETTINGS)
            .then(() => {
                this.setState({
                    submitDataStore: {
                        success: true,
                        error: false,
                    },
                })
            })
            .catch(e => {
                console.error(e)
                this.setState({
                    submitDataStore: {
                        success: false,
                        error: true,
                        message: e.message,
                    },
                })
            })
    }*/

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

    /*const handleSaveDataDialog = {
        open: () => {
            this.setState({
                openDialogSaveData: true,
            })
        },
        close: () => {
            this.setState({
                openDialogSaveData: false,
            })
        },
        save: () => {
            this.submitData()
            this.setState({
                openDialogSaveData: false,
                disableSave: true,
            })
        },
    }*/

    /**
     * Remove namespaces and keynames
     * */

    const removeNamespace = () => {
        removeNamespace()
            .then(() => {
                console.info('remove namespace')
                location.replace('/')
            })
            .catch(e => {
                console.error(e)
            })
    }

    if (loading === true) {
        return <CircularLoader small />
    }

    return (
        <>
            <UnsavedChangesAlert unsavedChanges={!form.disableSave} />

            <GeneralSettings
                state={{
                    openDialog,
                    submitDataStore,
                    openErrorAlert,
                }}
                generalForm={form}
                handleSaveDialog={handleSaveDataDialog}
                handleDisableSettings={handleDisableSettings}
            />
        </>
    )
}

export default AndroidSettingsContainer
