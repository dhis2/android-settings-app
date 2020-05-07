import React from 'react'

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

const {
    metadataSync,
    dataSync,
    encryptDB,
    reservedValues,
    numberSmsToSend,
    numberSmsConfirmation,
} = androidSettingsDefault

class AndroidSettingsContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        metadataSync,
        dataSync,
        numberSmsToSend,
        numberSmsConfirmation,
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
        },
        openErrorAlert: false,
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
            disableSave: false,
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
     * Checks if sms number and confirm number match
     */
    checkMatchingConfirmation = () => {
        if (
            this.state.numberSmsToSend !== '' &&
            this.state.numberSmsConfirmation !== ''
        ) {
            this.state.numberSmsToSend !== this.state.numberSmsConfirmation
                ? this.setState({ errorConfirmation: true })
                : this.setState({ errorConfirmation: false })
        }
    }

    /**
     * Updates Settings calling update api
     */
    submitData = () => {
        if (this.state.numberSmsToSend === '') {
            this.state.numberSmsToSend = null
        }

        if (this.state.numberSmsConfirmation === '') {
            this.state.numberSmsConfirmation = null
        }

        const androidData = {
            metadataSync: this.state.metadataSync,
            dataSync: this.state.dataSync,
            numberSmsToSend: this.state.numberSmsToSend,
            numberSmsConfirmation: this.state.numberSmsConfirmation,
            reservedValues: this.state.reservedValues,
            encryptDB: this.state.encryptDB,
            lastUpdated: new Date().toJSON(),
        }

        this.saveDataApi(androidData)
    }

    /**
     * Handle update api method to save settings in dataStore also shows alertBar for success and error
     * */
    saveDataApi = data => {
        api.updateValue(NAMESPACE, GENERAL_SETTINGS, data)
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
                    checkMatchingConfirmation={this.checkMatchingConfirmation}
                    handleReset={this.handleReset}
                    handleEncryptCheckbox={this.handleCheckbox}
                    handleSaveDialog={this.handleSaveDataDialog}
                />
            </>
        )
    }
}

export default AndroidSettingsContainer
