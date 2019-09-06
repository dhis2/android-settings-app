import React from 'react'

import { CircularProgress } from '@dhis2/d2-ui-core'
import api from '../utils/api'

import {
    metadataOptions,
    dataOptions,
    androidSettingsDefault,
    maxValues,
} from '../constants/android-settings'
import AndroidSettings from './android-settings'

const { metadataSync, dataSync, encryptDB } = androidSettingsDefault

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
        numberSmsToSent: '',
        numberSmsConfirmation: '',
        valuesTEI: '',
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
        if (e.target.name === 'valuesTEI') {
            const valueInput = e.target.value
            e.target.value > maxValues.valuesTEI
                ? (e.target.value = maxValues.valuesTEI)
                : (e.target.value = valueInput)
        }
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
        this.updateGlobal = true
    }

    /**
     * Checks if sms number and confirm number match
     */
    checkMatchingConfirmation = () => {
        if (
            this.state.numberSmsToSent !== '' &&
            this.state.numberSmsConfirmation !== ''
        ) {
            this.state.numberSmsToSent !== this.state.numberSmsConfirmation
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

        const androidData = this.state
        androidData.lastUpdated = new Date().toJSON()

        this.keyName === 'android_settings'
            ? api
                  .updateValue(
                      'ANDROID_SETTING_APP',
                      'android_settings',
                      androidData
                  )
                  .then(res => res)
            : api
                  .getKeys('ANDROID_SETTING_APP')
                  .then(
                      api
                          .createValue(
                              'ANDROID_SETTING_APP',
                              'android_settings',
                              androidData
                          )
                          .then(data => data)
                  )
    }

    /**
     * Resets values to default
     */
    handleReset = e => {
        e.preventDefault()
        this.setState({
            metadataSync: metadataSync,
            dataSync: dataSync,
            numberSmsToSent: '',
            numberSmsConfirmation: '',
            valuesTEI: '',
            encryptDB: encryptDB,
            isUpdated: false,
        })
        this.updateGlobal = true
    }

    async componentDidMount() {
        await api
            .getNamespaces()
            .then(res => {
                const nameSpace = res.filter(
                    name => name === 'ANDROID_SETTING_APP'
                )
                nameSpace.length === 0
                    ? (this.nameSpace = undefined)
                    : (this.nameSpace = nameSpace[0])
                this.nameSpace !== undefined
                    ? this.setState({ isUpdated: true })
                    : this.setState({ isUpdated: false })
                if (this.nameSpace === 'ANDROID_SETTING_APP') {
                    api.getKeys(this.nameSpace).then(res => {
                        const keyName = res.filter(
                            name => name === 'android_settings'
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
                            : this.setState({
                                  isUpdated: true,
                                  loading: false,
                              })
                    })
                } else if (this.nameSpace === undefined) {
                    api.createNamespace(
                        'ANDROID_SETTING_APP',
                        'android_settings'
                    ).catch(e => console.log(e))
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
            return <CircularProgress small />
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
