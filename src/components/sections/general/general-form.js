import React from 'react'

import TextField from '@material-ui/core/TextField'
import {
    dataOptions,
    maxValues,
    metadataOptions,
} from '../../../constants/android-settings'
import { Button, ButtonStrip, CheckboxField, Help } from '@dhis2/ui-core'
import MenuItem from '@material-ui/core/MenuItem'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'

import styles from '../../../styles/LayoutTitles.module.css'
import buttonStyles from '../../../styles/Button.module.css'

const GeneralForm = ({
    handleSaveDialog,
    handleForm,
    handleDisableSettings,
}) => {
    return (
        <form>
            <TextField
                label={i18n.t('How often should metadata sync?')}
                margin="normal"
                select
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                {...handleForm.getSelect('metadataSync')}
            >
                {metadataOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                label={i18n.t('How often should data sync?')}
                margin="normal"
                select
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                {...handleForm.getSelect('dataSync')}
            >
                {dataOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                type="tel"
                InputProps={{
                    inputProps: {
                        minLength: '4',
                        pattern: '^\\+[1-9][0-9]{3,16}$',
                    },
                }}
                label={i18n.t('SMS Gateway phone number')}
                helperText={
                    handleForm.errorNumber.numberSmsToSend
                        ? i18n.t(
                              'This phone number is not valid. Must start with + and be at least 4 characters long.'
                          )
                        : i18n.t(
                              'Must start with + and be at least 4 characters long.'
                          )
                }
                margin="normal"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                {...handleForm.getPhoneNumber('numberSmsToSend')}
            />

            <TextField
                type="tel"
                InputProps={{
                    inputProps: {
                        minLength: '4',
                        pattern: '^\\+[1-9][0-9]{3,16}$',
                    },
                }}
                label={i18n.t('SMS Result Sender phone number')}
                helperText={
                    handleForm.errorNumber.numberSmsConfirmation
                        ? i18n.t(
                              'This phone number is not valid. Must start with + and be at least 4 characters long.'
                          )
                        : i18n.t(
                              'Must start with + and be at least 4 characters long.'
                          )
                }
                margin="normal"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                {...handleForm.getPhoneNumber('numberSmsConfirmation')}
            />

            <TextField
                label={i18n.t('Reserved values downloaded per TEI attribute')}
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
                {...handleForm.getInput('reservedValues')}
            />

            <div className={styles.field__form__container}>
                <CheckboxField
                    label={i18n.t('Encrypt device database')}
                    helpText={i18n.t(
                        'Encrypt all data stored on device. Data can be lost if there are problems with an encrypted database. This will not affect the DHIS2 database stored on an external server.'
                    )}
                    {...handleForm.getCheckbox('encryptDB')}
                />
            </div>

            <div>
                <Button
                    onClick={handleDisableSettings.open}
                    disabled={handleForm.fields.disableAll}
                >
                    {i18n.t('Disable all settings')}
                </Button>
                <Help>
                    {i18n.t(
                        'This will disable and remove all General, Program and Data set settings.'
                    )}
                </Help>
            </div>

            <ButtonStrip className={buttonStyles.container__padding}>
                <Button
                    primary
                    className={buttonStyles.button_marginLeft}
                    onClick={handleSaveDialog.open}
                    disabled={handleForm.disableSave}
                >
                    {i18n.t('Save')}
                </Button>
                <Button
                    onClick={handleForm.handleReset}
                    disabled={handleForm.fields.disableAll}
                >
                    {i18n.t('Reset all values to default')}
                </Button>
            </ButtonStrip>
        </form>
    )
}

GeneralForm.propTypes = {
    handleForm: PropTypes.object.isRequired,
    handleSaveDialog: PropTypes.object.isRequired,
    handleDisableSettings: PropTypes.object.isRequired,
}

export default GeneralForm
