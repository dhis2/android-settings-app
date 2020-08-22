import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { CheckboxField } from '@dhis2/ui'
import FormSection from './form-section'

const SyncCheckboxField = ({ handleForm, syncElement }) => {
    const { label, helpText, syncType } = syncElement
    return (
        <FormSection>
            <CheckboxField
                label={i18n.t('{{label}}', { label })}
                helpText={i18n.t('{{helpText}}', { helpText })}
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

export default SyncCheckboxField
