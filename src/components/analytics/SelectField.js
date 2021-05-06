import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { FormSection } from '../sections/general/form-sections'

export const SelectField = ({
    label,
    options,
    onChange,
    name,
    value,
    ...props
}) => (
    <FormSection>
        <SingleSelectField
            inputWidth="250px"
            dense
            label={label}
            name={name}
            selected={value}
            onChange={e => onChange(e, name)}
            {...props}
        >
            {options.map(option => (
                <SingleSelectOption
                    key={option.value || option.id}
                    label={option.label || option.name}
                    value={option.value || option.id}
                />
            ))}
        </SingleSelectField>
    </FormSection>
)

SelectField.propTypes = {
    label: PropTypes.string,
    option: PropTypes.array,
    onChange: PropTypes.func,
    name: PropTypes.string,
}
