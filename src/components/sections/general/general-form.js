import React from 'react'

import TextField from '@material-ui/core/TextField'
import {
    dataOptions,
    maxValues,
    metadataOptions,
} from '../../../constants/android-settings'
import { Button, ButtonStrip, CheckboxField } from '@dhis2/ui-core'
import MenuItem from '@material-ui/core/MenuItem'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'

import styles from '../../../styles/LayoutTitles.module.css'
import buttonStyles from '../../../styles/Button.module.css'

const GeneralForm = ({
    state,
    handleChange,
    validatePhoneNumber,
    handleEncryptCheckbox,
    handleSaveDialog,
    handleReset,
    removeNamespace,
}) => {
    return (
        <form>
            <TextField
                id="metadataSync"
                name="metadataSync"
                label={i18n.t('How often should metadata sync?')}
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
                label={i18n.t('How often should data sync?')}
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
                label={i18n.t('SMS Gateway phone number')}
                helperText={
                    state.errorGateway
                        ? i18n.t('Incorrect phone number')
                        : i18n.t('Phone number that receives all SMS messages')
                }
                margin="normal"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                value={state.numberSmsToSend}
                onChange={handleChange}
                onKeyUp={validatePhoneNumber.gatewayNumber}
                error={state.errorGateway}
            />

            <TextField
                id="numberSmsConfirmation"
                name="numberSmsConfirmation"
                label={i18n.t('SMS Result Sender phone number')}
                helperText={
                    state.errorConfirmation
                        ? i18n.t('Incorrect phone number')
                        : ''
                }
                margin="normal"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                value={state.numberSmsConfirmation}
                onChange={handleChange}
                onKeyUp={validatePhoneNumber.confirmationNumber}
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

            <div className={styles.field__form__container}>
                <CheckboxField
                    name="encryptDB"
                    checked={state.encryptDB}
                    onChange={handleEncryptCheckbox.onChange}
                    label={i18n.t('Encrypt Database')}
                    helpText={i18n.t(
                        'Data can be lost if there are problems with an encrypted database'
                    )}
                />
            </div>

            <ButtonStrip className={buttonStyles.container__padding}>
                <Button
                    primary
                    className={buttonStyles.button_marginLeft}
                    onClick={handleSaveDialog.open}
                    disabled={state.disableSave}
                >
                    {i18n.t('Save')}
                </Button>
                <Button onClick={handleReset}>
                    {i18n.t('Reset all values to default')}
                </Button>
                <Button onClick={removeNamespace}>
                    {i18n.t('Remove settings')}
                </Button>
            </ButtonStrip>
        </form>
    )
}

GeneralForm.propTypes = {
    state: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    validatePhoneNumber: PropTypes.object.isRequired,
    handleReset: PropTypes.func.isRequired,
    handleEncryptCheckbox: PropTypes.object.isRequired,
    handleSaveDialog: PropTypes.object.isRequired,
}

export default GeneralForm
