import React from 'react'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { Button, ButtonStrip, CheckboxField } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import DialogEncrypt from './dialog-encrypt'

import buttonStyles from '../styles/Button.module.css'
import styles from '../styles/LayoutTitles.module.css'

const AndroidSettings = ({
    state,
    handleChange,
    metadataOptions,
    dataOptions,
    checkMatchingConfirmation,
    handleReset,
    maxValues,
    handleChangeSwitch,
    handleClose,
    handleEncrypt,
}) => {
    return (
        <>
            <div>
                <p className={styles.mainContent__title_headerBar}>
                    {i18n.t('General settings')}
                </p>
                <p className={styles.mainContent__subtitle}>
                    {i18n.t('These settings apply to all Android users.')}
                </p>
            </div>

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
                    label={i18n.t('SMS Gateway Phone number')}
                    helperText={i18n.t(
                        'Phone number that receives all SMS messages'
                    )}
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
                    label={i18n.t(
                        'Reserved values downloaded per TEI attribute'
                    )}
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
                        onChange={handleChangeSwitch}
                        label={i18n.t(
                            'Data can be lost if there are problems with an encrypted database'
                        )}
                        helpText={i18n.t('Encrypt Database')}
                    />
                </div>

                <ButtonStrip className={buttonStyles.container__padding}>
                    <Button className={buttonStyles.button_marginLeft} primary>
                        {i18n.t('Save')}
                    </Button>
                    <Button onClick={handleReset}>
                        {' '}
                        {i18n.t('Reset all values to default')}{' '}
                    </Button>
                </ButtonStrip>
            </form>

            <DialogEncrypt
                openDialog={state.openDialog}
                checked={state.encryptDB}
                onClose={handleClose}
                handleEncrypt={handleEncrypt}
            />
        </>
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
    handleChangeSwitch: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleEncrypt: PropTypes.func.isRequired,
}

export default AndroidSettings
