import React from 'react'

import { CircularLoader } from '@dhis2/ui-core'

import {
    androidSettingsDefault,
    maxValues,
    RESERVED_VALUES,
} from '../../../constants/android-settings'
import GeneralSettings from './general-settings'
import UnsavedChangesAlert from '../../unsaved-changes-alert'
import { apiLoadGeneralSettings } from '../../../modules/general/apiLoadSettings'
import { validateNumber } from '../../../modules/general/validatePhoneNumber'
import { removeNamespace } from '../../../modules/general/removeNamespace'
import { apiUpdateDataStore } from '../../../modules/general/apiUpdateDataStore'

const {
    metadataSync,
    dataSync,
    encryptDB,
    reservedValues,
} = androidSettingsDefault

class AndroidSettingsContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        metadataSync,
        dataSync,
        numberSmsToSend: '',
        numberSmsConfirmation: '',
        reservedValues,
        encryptDB,
        loading: true,
        errorConfirmation: false,
        openDialog: false,
        openDialogSaveData: false,
        disableSave: true,
        submitDataStore: {
            success: false,
            error: false,
            message: undefined,
        },
        openErrorAlert: false,
        errorGateway: false,
    }

    /**
     * Updates global settings on fly
     */
    handleChange = e => {
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
    }

    /**
     * When using checkbox for Encrypt DB should open dialog
     * onChange: When Checkbox is checked or not opens dialog
     * onClose: close Encrypt DB dialog
     * handleEncrypt: Changes value for encryptDB state
     */

    handleCheckbox = {
        onChange: () => {
            this.setState({
                ...this.state,
                openDialog: true,
                submitDataStore: {
                    success: false,
                    error: false,
                },
            })
        },
        onClose: () => {
            this.setState({
                ...this.state,
                openDialog: false,
            })
        },
        handleEncrypt: isChecked => {
            this.setState({
                ...this.state,
                encryptDB: !isChecked,
                openDialog: false,
                disableSave: false,
            })
        },
    }

    /**
     * Checks if sms number or confirmation number is valid
     */
    validatePhoneNumber = {
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
    }

    /**
     * Updates Settings calling update api,
     * check if gateway and confirmation number are not empty
     * Prevent null console warning
     */
    submitData = () => {
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
    }

    /**
     * Handle update api method to save settings in dataStore also shows alertBar for success and error
     * */
    saveDataApi = data => {
        apiUpdateDataStore(data)
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
    }

    /**
     * Sets values to default
     */
    handleReset = () => {
        this.setState({
            metadataSync,
            dataSync,
            numberSmsToSend: '',
            numberSmsConfirmation: '',
            reservedValues,
            encryptDB,
            openDialog: false,
            disableSave: false,
            submitDataStore: {
                success: false,
                error: false,
                message: undefined,
            },
            openErrorAlert: false,
        })
    }

    /**
     * Handle save DataStore dialog
     * */
    handleSaveDataDialog = {
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
    }

    /**
     * Remove namespaces and keynames
     * */

    removeNamespace = () => {
        removeNamespace()
            .then(() => {
                console.info('remove namespace')
                location.replace('/')
            })
            .catch(e => {
                console.error(e)
            })
    }

    /**
     * When component mount, get namespace and keys from dataStore
     */
    componentDidMount() {
        apiLoadGeneralSettings()
            .then(generalSettings => {
                this.setState({
                    ...generalSettings,
                    loading: false,
                    disableSave: true,
                })
            })
            .catch(e => {
                console.error(e)
                this.setState({
                    loading: false,
                    openErrorAlert: true,
                })
            })
    }

    render() {
        if (this.state.loading === true) {
            return <CircularLoader small />
        }

        return (
            <>
                <UnsavedChangesAlert unsavedChanges={!this.state.disableSave} />

                <GeneralSettings
                    state={this.state}
                    handleChange={this.handleChange}
                    validatePhoneNumber={this.validatePhoneNumber}
                    handleReset={this.handleReset}
                    handleEncryptCheckbox={this.handleCheckbox}
                    handleSaveDialog={this.handleSaveDataDialog}
                    removeNamespace={this.removeNamespace}
                />
            </>
        )
    }
}

export default AndroidSettingsContainer
