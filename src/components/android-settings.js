import React from 'react'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Button } from '@dhis2/d2-ui-core'
import api from '../utils/api'

// import { setInstance } from 'd2';

import { metadataOptions, dataOptions } from '../constants/android-settings'

class AndroidSettings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            metadataSync: '',
            dataSync: '',
            numberSmsToSent: '',
            numberSmsConfirmation: '',
            valuesTEI: '',
            encryptDB: '',
            isUpdated: false,
        }

        this.nameSpace = undefined
        this.keyName = undefined
        /* if (this.props.d2) {
            setInstance(props.d2);
        } */
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
                                    })
                                }
                            )
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
                })
            })
    }

    onChangeValue = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
        console.log({
            field: e.target.name,
            value: e.target.value,
            state: this.state,
        })
    }

    handleSubmit = async e => {
        // e.preventDefault()

        this.onChangeValue(e)

        const androidData = this.state
        androidData.date = new Date().toJSON()

        console.log(androidData)

        if (this.nameSpace === 'android_settings') {
            api.updateValue(
                'ANDROID_SETTING_APP',
                'android_settings',
                androidData
            )
                .then(res => {
                    console.log('res update', res)
                })
                .then(data => {
                    console.log('data response update', data)
                })
        } else {
            api.getKeys('ANDROID_SETTING_APP').then(
                api
                    .updateValue(
                        'ANDROID_SETTING_APP',
                        'android_settings',
                        androidData
                    )
                    .then(data => {
                        console.log('data response update', data)
                    })
            )
        }

        console.log({
            state: this.state,
        })
    }

    handleReset = e => {
        e.preventDefault()
        this.setState({
            metadataSync: '',
            dataSync: '',
            numberSmsToSent: '',
            numberSmsConfirmation: '',
            valuesTEI: '',
            encryptDB: '',
            isUpdated: false,
        })
    }

    handleCancel = e => {
        e.preventDefault()
    }

    render() {
        return (
            <form>
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
                    onChange={this.handleSubmit}
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
                    onChange={this.handleSubmit}
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
                    onChange={this.handleSubmit}
                />

                <TextField
                    id="numberSmsConfirmation"
                    name="numberSmsConfirmation"
                    label="Confirmation SMS number"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.numberSmsConfirmation}
                    onChange={this.handleSubmit}
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
                    value={this.state.valuesTEI}
                    onChange={this.handleSubmit}
                />

                <div>
                    <p className="main-content__title"> Encrypt DB </p>
                    <RadioGroup
                        aria-label="Encrypt"
                        name="encryptDB"
                        value={this.state.encryptDB}
                        onChange={this.handleSubmit}
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
            </form>
        )
    }
}

export default AndroidSettings
