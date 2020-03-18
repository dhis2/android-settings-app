import React from 'react'

import { CircularLoader } from '@dhis2/ui-core'
import api from '../utils/api'

import {
    metadataOptions,
    dataOptions,
    androidSettingsDefault,
    maxValues,
} from '../constants/android-settings'
import AndroidSettings from './android-settings'
import { NAMESPACE, GENERAL_SETTINGS } from '../constants/data-store'

const {
    metadataSync,
    dataSync,
    encryptDB,
    reservedValues,
} = androidSettingsDefault

class AndroidSettingsContainer extends React.Component {
    constructor(props) {
        super(props)

        this.nameSpace = undefined
        this.keyName = undefined
        this.updateGlobal = false
    }

    state = {
        metadataSync: metadataSync,
        dataSync: dataSync,
        numberSmsToSend: '',
        numberSmsConfirmation: '',
        reservedValues: reservedValues,
        encryptDB: encryptDB,
        isUpdated: false,
        loading: true,
        errorConfirmation: false,
    }

    /**
     * Updates global settings on fly
     */
    handleChange = e => {
        e.preventDefault()

        let { value } = e.target

        if (e.target.name === 'reservedValues') {
            value = Math.min(maxValues.reservedValues, parseInt(value))
        }

        if (e.target.name === 'encryptDB') {
            value = e.target.checked
        }

        this.setState({
            ...this.state,
            [e.target.name]: value,
        })
        this.updateGlobal = true
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
        if (!this.updateGlobal) {
            return true
        }

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

    saveDataApi = data => {
        this.keyName === GENERAL_SETTINGS
            ? api
                  .updateValue(NAMESPACE, GENERAL_SETTINGS, data)
                  .then(res => res)
            : api
                  .getKeys(NAMESPACE)
                  .then(
                      api
                          .createValue(NAMESPACE, GENERAL_SETTINGS, data)
                          .then(res => res)
                  )
    }

    /**
     * Resets values to default
     */
    handleReset = () => {
        this.setState({
            metadataSync: metadataSync,
            dataSync: dataSync,
            numberSmsToSend: '',
            numberSmsConfirmation: '',
            reservedValues: reservedValues,
            encryptDB: encryptDB,
            isUpdated: false,
        })
        this.updateGlobal = true
    }

    async componentDidMount() {
        await api
            .getNamespaces()
            .then(res => {
                const nameSpace = res.filter(name => name === NAMESPACE)
                nameSpace.length === 0
                    ? (this.nameSpace = undefined)
                    : (this.nameSpace = nameSpace[0])
                this.nameSpace !== undefined
                    ? this.setState({ isUpdated: true })
                    : this.setState({ isUpdated: false })
                if (this.nameSpace === NAMESPACE) {
                    api.getKeys(this.nameSpace).then(res => {
                        const keyName = res.filter(
                            name => name === GENERAL_SETTINGS
                        )
                        keyName.length === 0
                            ? (this.keyName = undefined)
                            : (this.keyName = keyName[0])

                        this.keyName !== undefined
                            ? api
                                  .getValue(this.nameSpace, this.keyName)
                                  .then(res => {
                                      this.setState({
                                          ...res.value,
                                          isUpdated: true,
                                          loading: false,
                                      })
                                  })
                            : api
                                  .updateValue(NAMESPACE, GENERAL_SETTINGS, {
                                      metadataSync: metadataSync,
                                      dataSync: dataSync,
                                      numberSmsToSend: '',
                                      numberSmsConfirmation: '',
                                      reservedValues: reservedValues,
                                      encryptDB: encryptDB,
                                  })
                                  .then(res => {
                                      this.setState({
                                          metadataSync: metadataSync,
                                          dataSync: dataSync,
                                          numberSmsToSend: '',
                                          numberSmsConfirmation: '',
                                          reservedValues: reservedValues,
                                          encryptDB: encryptDB,
                                      })
                                  })
                    })
                } else if (this.nameSpace === undefined) {
                    api.createNamespace(NAMESPACE, GENERAL_SETTINGS)
                        .then(res => {
                            this.keyName = GENERAL_SETTINGS
                            this.setState({
                                isUpdated: true,
                                loading: false,
                            })
                        })
                        .catch(e => {
                            console.error('no namespace error', e)
                            this.setState({
                                isUpdated: true,
                                loading: false,
                                metadataSync: metadataSync,
                                dataSync: dataSync,
                                numberSmsToSend: '',
                                numberSmsConfirmation: '',
                                reservedValues: reservedValues,
                                encryptDB: encryptDB,
                            })
                        })
                }
            })
            .catch(e => {
                this.setState({
                    isUpdated: false,
                    loading: false,
                })
            })
    }

    componentDidUpdate() {
        this.submitData()
    }

    render() {
        if (this.state.loading === true) {
            return <CircularLoader small />
        }

        return (
            <AndroidSettings
                state={this.state}
                handleChange={this.handleChange}
                metadataOptions={metadataOptions}
                dataOptions={dataOptions}
                checkMatchingConfirmation={this.checkMatchingConfirmation}
                handleReset={this.handleReset}
                maxValues={maxValues}
            />
        )
    }
}

export default AndroidSettingsContainer
