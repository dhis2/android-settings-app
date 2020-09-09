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
            syncElement={generalSettingsFormSections.encryptDB}
            handleForm={handleForm}
        />

        <ButtonField
            syncElement={generalSettingsFormSections.disableSettings}
            handleForm={handleForm}
            handleDisableSettings={handleDisableSettings}
        />

        <FooterActionButtons
            disableSave={handleForm.disableSave}
            disableReset={handleForm.fields.disableAll}
            clickReset={handleForm.handleReset}
            handleSaveDialog={handleSaveDialog}
        />
    </form>
)

GeneralForm.propTypes = {
    handleForm: PropTypes.object.isRequired,
    handleSaveDialog: PropTypes.object.isRequired,
    handleDisableSettings: PropTypes.object.isRequired,
}

export default GeneralForm
