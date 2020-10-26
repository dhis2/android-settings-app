import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { FormSection } from './form-section'

export const SyncSelectField = ({ syncElement, handleForm }) => {
    const { label, options, syncType } = syncElement
    return (
        <FormSection>
            <SingleSelectField
                inputWidth="250px"
                label={label}
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
