import React from 'react'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import i18n from '@dhis2/d2-i18n'

import styles from '../styles/LayoutTitles.module.css'
import buttonStyles from '../styles/Button.module.css'

/* import { Button } from '@dhis2/d2-ui-core' */
import { Button } from '@dhis2/ui-core'

const AndroidSettings = ({
    state,
    handleChange,
    metadataOptions,
    dataOptions,
    checkMatchingConfirmation,
    handleReset,
    maxValues,
}) => {
    return (
        <form>
            <TextField
                id="metadataSync"
                name="metadataSync"
                label={i18n.t('Metadata Sync')}
                margin="normal"
                select
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                value={state.metadataSync}
                onChange={handleChange}
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
                label={i18n.t('Data Sync')}
                margin="normal"
                select
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                value={state.dataSync}
                onChange={handleChange}
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
                label={i18n.t('SMS Gateway Phone number where SMS are sent')}
                margin="normal"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                value={state.numberSmsToSent}
                onChange={handleChange}
                onBlur={checkMatchingConfirmation}
            />

            <TextField
                id="numberSmsConfirmation"
                name="numberSmsConfirmation"
                label={i18n.t('Confirm SMS Gateway Phone number')}
                margin="normal"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                value={state.numberSmsConfirmation}
                onChange={handleChange}
                onBlur={checkMatchingConfirmation}
                error={state.errorConfirmation}
            />

            <TextField
                id="valuesTEI"
                label={i18n.t('Reserved values downloaded per TEI attribute')}
                name="valuesTEI"
                type="number"
                margin="normal"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    inputProps: {
                        min: 0,
                        step: 10,
                        max: maxValues.valuesTEI,
                    },
                }}
                value={state.valuesTEI}
                onChange={handleChange}
            />

            <div>
                <p className={styles.mainContent__title}>
                    {' '}
                    {i18n.t('Encrypt DB')}{' '}
                </p>
                <RadioGroup
                    aria-label={i18n.t('Encrypt')}
                    name="encryptDB"
                    value={state.encryptDB}
                    onChange={handleChange}
                    row
                >
                    <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label={i18n.t('No')}
                    />
                    <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label={i18n.t('Yes')}
                    />
                </RadioGroup>
            </div>

            <div className={buttonStyles.mainContent__button__container}>
                <Button onClick={handleReset} raised primary>
                    {i18n.t('SET TO DEFAULT')}
                </Button>
            </div>
        </form>
    )
}

/* class AndroidSettings extends React.Component {
    constructor(props) {
        super(props)
        this.androidSettings = props
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
                    value={this.props.state.metadataSync}
                    onChange={this.props.handleChange}
                >
                    {this.props.metadataOptions.map(option => (
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
                    value={this.props.state.dataSync}
                    onChange={this.props.handleChange}
                >
                    {this.props.dataOptions.map(option => (
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
                    value={this.props.state.numberSmsToSent}
                    onChange={this.props.handleChange}
                    onBlur={this.props.checkMatchingConfirmation}
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
                    value={this.props.state.numberSmsConfirmation}
                    onChange={this.props.handleChange}
                    onBlur={this.props.checkMatchingConfirmation}
                    error={this.props.state.errorConfirmation}
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
                    InputProps={{
                        inputProps: {
                            min: 0,
                            step: 10,
                            max: this.props.maxValues.valuesTEI,
                        },
                    }}
                    value={this.props.state.valuesTEI}
                    onChange={this.props.handleChange}
                />

                <div>
                    <p className={styles.mainContent__title}> Encrypt DB </p>
                    <RadioGroup
                        aria-label="Encrypt"
                        name="encryptDB"
                        value={this.props.state.encryptDB}
                        onChange={this.props.handleChange}
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

                <div className={buttonStyles.mainContent__button__container}> 
                    <Button
                        onClick={this.props.handleReset}
                        raised
                        color="primary"
                    >
                        SET TO DEFAULT
                    </Button>
                </div>
            </form>
        )
    }
} */

export default AndroidSettings
