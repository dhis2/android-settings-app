import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FieldSection } from '../field'

export const SelectField = ({
    label,
    options,
    onChange,
    name,
    value,
    ...props
}) => (
    <FieldSection>
        <SingleSelectField
            inputWidth="250px"
            dense
            label={label}
            name={name}
            selected={value}
            onChange={(e) => onChange(e, name)}
            {...props}
        >
            {options.map((option) => (
                <SingleSelectOption
                    key={option.value || option.id}
                    label={option.label || option.name}
                    value={option.value || option.id}
                />
            ))}
        </SingleSelectField>
    </FieldSection>
)

SelectField.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    name: PropTypes.string,
}
