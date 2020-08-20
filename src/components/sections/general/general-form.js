import React from 'react'

import {
    dataOptions,
    metadataOptions,
} from '../../../constants/android-settings'
import {
    Button,
    ButtonStrip,
    CheckboxField,
    Help,
    SingleSelectField,
    SingleSelectOption,
    InputField,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import buttonStyles from '../../../styles/Button.module.css'
import formStyles from '../../../styles/Form.module.css'

const GeneralForm = ({
    handleSaveDialog,
    handleForm,
    handleDisableSettings,
}) => {
    return (
        <form>
            <div className={formStyles.row}>
                <SingleSelectField
                    label={i18n.t('How often should data sync?')}
                    onChange={payload =>
                        handleForm.onChangeSelect(payload, 'metadataSync')
                    }
                    {...handleForm.getSelect('metadataSync')}
                >
                    {metadataOptions.map(option => (
                        <SingleSelectOption
                            key={option.value}
                            label={option.label}
                            value={option.value}
                        />
                    ))}
                </SingleSelectField>
            </div>

            <div className={formStyles.row}>
                <SingleSelectField
                    label={i18n.t('How often should data sync?')}
                    onChange={payload =>
                        handleForm.onChangeSelect(payload, 'dataSync')
                    }
                    {...handleForm.getSelect('dataSync')}
                >
                    {dataOptions.map(option => (
                        <SingleSelectOption
                            key={option.value}
                            label={option.label}
                            value={option.value}
                        />
                    ))}
                </SingleSelectField>
            </div>

            <div className={formStyles.row}>
                <InputField
                    type="tel"
                    helpText={i18n.t(
                        'Must start with + and be at least 4 characters long.'
                    )}
                    label={i18n.t('SMS Gateway phone number')}
                    {...handleForm.getPhoneNumber('numberSmsToSend')}
                />
            </div>

            <div className={formStyles.row}>
                <InputField
                    type="tel"
                    helpText={i18n.t(
                        'Must start with + and be at least 4 characters long.'
                    )}
                    label={i18n.t('SMS Result Sender phone number')}
                    {...handleForm.getPhoneNumber('numberSmsConfirmation')}
                />
            </div>

            <div className={formStyles.row}>
                <InputField
                    label={i18n.t(
                        'Reserved values downloaded per TEI attribute'
                    )}
                    {...handleForm.getInputNumber('reservedValues')}
                />
            </div>

            <div className={formStyles.row}>
                <CheckboxField
                    label={i18n.t('Encrypt device database')}
                    helpText={i18n.t(
                        'Encrypt all data stored on device. Data can be lost if there are problems with an encrypted database. This will not affect the DHIS2 database stored on an external server.'
                    )}
                    {...handleForm.getCheckbox('encryptDB')}
                />
            </div>

            <div className={formStyles.rowMargin}>
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
