import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { FieldSection } from './FieldSection'

export const SelectField = ({ label, options, onChange, ...props }) => (
    <FieldSection>
        <SingleSelectField
            inputWidth="250px"
            label={label}
            onChange={onChange}
            {...props}
        >
            {options.map(option => (
                <SingleSelectOption
                    key={option.value}
                    label={option.label}
                    value={option.value}
                />
            ))}
        </SingleSelectField>
    </FieldSection>
)

SelectField.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
}
