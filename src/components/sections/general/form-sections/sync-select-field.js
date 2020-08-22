import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import FormSection from './form-section'

const SyncSelectField = ({ syncElement, handleForm }) => {
    const { label, options, syncType } = syncElement
    return (
        <FormSection>
            <SingleSelectField
                inputWidth="250px"
                label={i18n.t('{{label}}', { label })}
                onChange={payload =>
                    handleForm.onChangeSelect(payload, syncType)
                }
                {...handleForm.getSelect(syncType)}
            >
                {options.map(option => (
                    <SingleSelectOption
                        key={option.value}
                        label={option.label}
                        value={option.value}
                    />
                ))}
            </SingleSelectField>
        </FormSection>
    )
}

SyncSelectField.propTypes = {
    syncElement: PropTypes.shape({
        label: PropTypes.string,
        syncType: PropTypes.string,
        options: PropTypes.array,
    }),
    handleForm: PropTypes.object,
}

export default SyncSelectField
