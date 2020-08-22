import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { generalSettings } from '../../../constants/android-settings'
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
            syncElement={generalSettings.metadata}
            handleForm={handleForm}
        />

        <SyncSelectField
            syncElement={generalSettings.data}
            handleForm={handleForm}
        />

        <SyncInputPhoneField
            syncElement={generalSettings.smsToSend}
            handleForm={handleForm}
        />

        <SyncInputPhoneField
            syncElement={generalSettings.smsConfirmation}
            handleForm={handleForm}
        />

        <SyncInputNumberField
            syncElement={generalSettings.reservedValues}
            handleForm={handleForm}
        />

        <SyncCheckboxField
            syncElement={generalSettings.encryptDB}
            handleForm={handleForm}
        />

        <ButtonField
            syncElement={generalSettings.disableSettings}
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
