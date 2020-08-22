import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { InputField } from '@dhis2/ui'
import FormSection from './form-section'

const SyncInputNumberField = ({ syncElement, handleForm }) => {
    const { label, syncType } = syncElement
    return (
        <FormSection>
            <InputField
                inputWidth="100px"
                label={i18n.t('{{label}}', { label })}
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

export default SyncInputNumberField
