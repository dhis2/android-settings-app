import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { InputField } from '@dhis2/ui'
import { FormSection } from './form-section'

export const SyncInputNumberField = ({ syncElement, handleForm }) => {
    const { label, syncType } = syncElement
    return (
        <FormSection>
            <InputField
                inputWidth="100px"
                label={label}
                {...handleForm.getInputNumber(syncType)}
            />
        </FormSection>
    )
}

SyncInputNumberField.propTypes = {
    syncElement: PropTypes.shape({
        label: PropTypes.string,
        syncType: PropTypes.string,
    }),
    handleForm: PropTypes.object,
}
