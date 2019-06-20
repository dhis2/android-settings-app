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
        /* if (this.props.d2) {
            setInstance(props.d2);
        } */
    }

    componentDidMount() {
        api.getNamespaces()
            .then(res => {
                console.log('res', res)
                const nameSpace = res.filter(
                    name => name === 'ANDROID_SETTING_APP'
                )
                console.log(nameSpace)
                nameSpace.length === 0
                    ? (this.nameSpace = undefined)
                    : (this.nameSpace = nameSpace[0])
                this.nameSpace !== undefined
                    ? this.setState({ isUpdated: true })
                    : this.setState({ isUpdated: false })
            })
            .catch(e => {
                this.setState({
                    isUpdated: false,
                })
            })

        console.log({
            state: this.state,
        })
    }

    onChangeValue = e => {
        console.log({
            field: e.target.name,
            value: e.target.value,
        })
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = async e => {
        e.preventDefault()

        /* this.props.d2.dataStore
            .create('ANDROID_SETTING')
            .then(namespace => {
                namespace.set('android_settings', this.state)
            })
            .then(res => res.json())
            .then(data2 => {
                console.log('data response', data2)
            })
            .catch(e => {
                // console.log('error ', e)
                this.props.d2.dataStore
                    .get('ANDROID_SETTING')
                    .then(namespace => {
                        namespace.set('android_settings', this.state)
                    })
            }) */

        const androidData = this.state
        androidData.date = new Date().toJSON()

        if (this.state.isUpdated === true) {
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
            if (this.nameSpace === undefined) {
                api.createNamespace('ANDROID_SETTING_APP', 'android_settings')
                    .then(res => {
                        console.log(res)
                    })
                    .then(
                        api.createValue(
                            'ANDROID_SETTING_APP',
                            'android_settings',
                            androidData
                        )
                    )
                    .catch(e => {
                        console.log('error', e)
                    })
            }
            /* api.createValue("ANDROID_SETTING_APP", "android_settings", androidData)
                .then(res => {
                    console.log('res', res)
                })
                .then(data => {
                    console.log('data response', data)
                })
                .catch(e => {
                    console.log('error', e)
                }) */
        }

        console.log({
            state: this.state,
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
                    onChange={this.onChangeValue}
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
                    onChange={this.onChangeValue}
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
                    onChange={this.onChangeValue}
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
                    onChange={this.onChangeValue}
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
                    onChange={this.onChangeValue}
                />

                <div>
                    <p className="main-content__title"> Encrypt DB </p>
                    <RadioGroup
                        aria-label="Encrypt"
                        name="encryptDB"
                        value={this.state.encryptDB}
                        onChange={this.onChangeValue}
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
                    <Button onClick={this.handleSubmit} raised color="primary">
                        SAVE
                    </Button>
                    <Button
                        onClick={this.handleCancel}
                        className="main-content__button__cancel"
                    >
                        CANCEL
                    </Button>
                </div>
            </form>
        )
    }
}

export default AndroidSettings
