import React from 'react'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Button } from '@dhis2/d2-ui-core'
// import api from '../API/api';
// import { api, callApi } from '../API/api_test'
// import { setInstance } from 'd2';

import { metadataOptions, dataOptions } from '../JSONS/android-settings'

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
        }

        /* if (this.props.d2) {
            setInstance(props.d2);
        } */
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

        this.props.d2.dataStore
            .create('ANDROID_SETTING')
            .then(namespace => {
                namespace.set('android_settings', this.state)
            })
            .then(res => res.json())
            .then(data2 => {
                console.log('data response', data2)
            })
            .catch(e => {
                console.log('error ', e)
                this.props.d2.dataStore
                    .get('ANDROID_SETTING')
                    .then(namespace => {
                        namespace.set('android_settings', this.state)
                    })
            })

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
                        {' '}
                        SAVE{' '}
                    </Button>
                    <Button
                        onClick={this.handleCancel}
                        className="main-content__button__cancel"
                    >
                        {' '}
                        CANCEL{' '}
                    </Button>
                </div>
            </form>
        )
    }
}

export default AndroidSettings
