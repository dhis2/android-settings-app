import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { InputField } from '@dhis2/ui'
import { FormSection } from './form-section'

export const SyncInputPhoneField = ({ handleForm, syncElement }) => {
    const { label, helpText, syncType } = syncElement
    return (
        <FormSection>
            <InputField
                type="tel"
                inputWidth="250px"
                helpText={helpText}
                label={label}
                {...handleForm.getPhoneNumber(syncType)}
            />
        </FormSection>
    )
}

SyncInputPhoneField.propTypes = {
    syncElement: PropTypes.shape({
        label: PropTypes.string,
        helpText: PropTypes.string,
        syncType: PropTypes.string,
    }),
    handleForm: PropTypes.object,
}
