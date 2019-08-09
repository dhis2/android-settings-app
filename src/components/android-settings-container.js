import React from 'react'

/* import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel' */
import { CircularProgress } from '@dhis2/d2-ui-core'
//import { Button } from '@dhis2/d2-ui-core'
import api from '../utils/api'

import {
    metadataOptions,
    dataOptions,
    androidSettingsDefault,
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

    handleChange = e => {
        e.preventDefault()
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })

        this.updateGlobal = true
    }

    checkMatchingConfirmation = () => {
        if (
            this.state.numberSmsToSent !== '' &&
            this.state.numberSmsConfirmation !== ''
        ) {
            this.state.numberSmsToSent !== this.state.numberSmsConfirmation
                ? this.setState({
                      errorConfirmation: true,
                  })
                : this.setState({
                      errorConfirmation: false,
                  })
        }
    }

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
                  .then(res => {
                      console.log('res update', res)
                  })
            : api.getKeys('ANDROID_SETTING_APP').then(
                  api
                      .createValue(
                          'ANDROID_SETTING_APP',
                          'android_settings',
                          androidData
                      )
                      .then(data => {
                          console.log('data response update', data)
                      })
              )
    }

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
                        if (this.keyName !== undefined) {
                            api.getValue(this.nameSpace, this.keyName).then(
                                res => {
                                    this.setState({
                                        ...res.value,
                                        isUpdated: true,
                                        loading: false,
                                    })
                                }
                            )
                        } else {
                            console.log('no data settings')

                            this.setState({
                                isUpdated: true,
                                loading: false,
                            })
                        }
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
                states={this.state}
                handleChange={this.handleChange}
                metadataOptions={metadataOptions}
                dataOptions={dataOptions}
                checkMatchingConfirmation={this.checkMatchingConfirmation}
                handleReset={this.handleReset}
            />
        )
    }
}

export default AndroidSettingsContainer

/* <form>
                <TextField
                    id="metadataSync"
                    name="metadataSync"
                    label="Metadata Sync"
                    margin="normal"
                    select
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.metadataSync}
                    onChange={this.handleChange}
                >
                    {metadataOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="dataSync"
                    name="dataSync"
                    label="Data Sync"
                    margin="normal"
                    select
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.dataSync}
                    onChange={this.handleChange}
                >
                    {dataOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="numberSmsToSent"
                    name="numberSmsToSent"
                    label="SMS Gateway Phone number where SMS are sent"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.numberSmsToSent}
                    onChange={this.handleChange}
                    onBlur={this.checkMatchingConfirmation}
                />

                <TextField
                    id="numberSmsConfirmation"
                    name="numberSmsConfirmation"
                    label="Confirm SMS Gateway Phone number"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.numberSmsConfirmation}
                    onChange={this.handleChange}
                    onBlur={this.checkMatchingConfirmation}
                    error={this.state.errorConfirmation}
                />

                <TextField
                    id="valuesTEI"
                    label="Reserved values downloaded per TEI attribute"
                    name="valuesTEI"
                    type="number"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{ inputProps: { min: 0, step: 10 } }}
                    value={this.state.valuesTEI}
                    onChange={this.handleChange}
                />

                <div>
                    <p className="main-content__title"> Encrypt DB </p>
                    <RadioGroup
                        aria-label="Encrypt"
                        name="encryptDB"
                        value={this.state.encryptDB}
                        onChange={this.handleChange}
                        row
                    >
                        <FormControlLabel
                            value="no"
                            control={<Radio color="primary" />}
                            label="No"
                        />
                        <FormControlLabel
                            value="yes"
                            control={<Radio color="primary" />}
                            label="Yes"
                        />
                    </RadioGroup>
                </div>

                <div className="main-content__button__container">
                    <Button onClick={this.handleReset} raised color="primary">
                        SET TO DEFAULT
                    </Button>
                </div>
            </form> */
