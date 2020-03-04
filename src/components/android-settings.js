import React from 'react'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Button } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'

import styles from '../styles/LayoutTitles.module.css'
import buttonStyles from '../styles/Button.module.css'

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
                id="numberSmsToSend"
                name="numberSmsToSend"
                label={i18n.t('SMS Gateway Phone number where SMS are sent')}
                margin="normal"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                value={state.numberSmsToSend}
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
                id="reservedValues"
                label={i18n.t('Reserved values downloaded per TEI attribute')}
                name="reservedValues"
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
                        max: maxValues.reservedValues,
                    },
                }}
                value={state.reservedValues}
                onChange={handleChange}
            />

            <div>
                <p className={styles.mainContent__title}>
                    {i18n.t('Encrypt DB')}
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
                <Button onClick={handleReset} primary>
                    {i18n.t('SET TO DEFAULT')}
                </Button>
            </div>
        </form>
    )
}

AndroidSettings.propTypes = {
    state: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    metadataOptions: PropTypes.array.isRequired,
    dataOptions: PropTypes.array.isRequired,
    checkMatchingConfirmation: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    maxValues: PropTypes.object.isRequired,
}

export default AndroidSettings
