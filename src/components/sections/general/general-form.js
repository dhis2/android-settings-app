import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { generalSettingsFormSections } from '../../../constants/android-settings'
import {
    SyncSelectField,
    SyncInputPhoneField,
    SyncInputNumberField,
    SyncCheckboxField,
    ButtonField,
} from './form-sections'
import FooterActionButtons from '../../footer-action-buttons'

const GeneralForm = ({
    handleSaveDialog,
    handleForm,
    handleDisableSettings,
}) => (
    <form>
        <SyncSelectField
            syncElement={generalSettingsFormSections.metadata}
            handleForm={handleForm}
        />

        <SyncSelectField
            syncElement={generalSettingsFormSections.data}
            handleForm={handleForm}
        />

        <SyncInputPhoneField
            syncElement={generalSettingsFormSections.smsToSend}
            handleForm={handleForm}
        />

        <SyncInputPhoneField
            syncElement={generalSettingsFormSections.smsConfirmation}
            handleForm={handleForm}
        />

        <SyncInputNumberField
            syncElement={generalSettingsFormSections.reservedValues}
            handleForm={handleForm}
        />

        <SyncCheckboxField
            label={generalSettingsFormSections.encryptDB.label}
            helpText={generalSettingsFormSections.encryptDB.helpText}
            name={generalSettingsFormSections.encryptDB.syncType}
            checked={
                handleForm.fields[
                    generalSettingsFormSections.encryptDB.syncType
                ]
            }
            disabled={handleForm.fields.disableAll}
            onChange={handleForm.handleEncryptDialog.onChange}
        />

        <ButtonField
            label={generalSettingsFormSections.disableSettings.label}
            helpText={generalSettingsFormSections.disableSettings.helpText}
            onOpen={handleDisableSettings.open}
            disabled={handleForm.fields.disableAll}
        />

        <FooterActionButtons
            saveButtonDisabled={handleForm.disableSave}
            resetButtonDisabled={handleForm.fields.disableAll}
            onResetClick={handleForm.handleReset}
            onSave={handleSaveDialog.open}
        />
    </form>
)

GeneralForm.propTypes = {
    handleForm: PropTypes.object.isRequired,
    handleSaveDialog: PropTypes.object.isRequired,
    handleDisableSettings: PropTypes.object.isRequired,
}

export default GeneralForm
