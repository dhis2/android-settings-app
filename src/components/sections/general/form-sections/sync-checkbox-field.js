import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { CheckboxField } from '@dhis2/ui'
import { FormSection } from './form-section'

export const SyncCheckboxField = ({ handleForm, syncElement }) => {
    const { label, helpText, syncType } = syncElement
    return (
        <FormSection>
            <CheckboxField
                label={label}
                helpText={helpText}
                {...handleForm.getCheckbox(syncType)}
            />
        </FormSection>
    )
}

SyncCheckboxField.propTypes = {
    syncElement: PropTypes.shape({
        label: PropTypes.string,
        helpText: PropTypes.string,
        syncType: PropTypes.string,
    }),
    handleForm: PropTypes.object,
}
