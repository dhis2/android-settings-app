import { Field, MultiSelect, MultiSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export const MultiSelectField = ({
    label,
    options,
    selected,
    onChange,
    required = false,
    error = false,
    validationText = '',
    ...props
}) => (
    <Field
        label={label}
        required={required}
        error={error}
        validationText={error ? validationText : ''}
    >
        <MultiSelect
            placeholder="Choose an option"
            selected={selected}
            onChange={onChange}
            {...props}
        >
            {options.map((option) => (
                <MultiSelectOption
                    key={option.value}
                    label={option.label}
                    value={option.value}
                />
            ))}
        </MultiSelect>
    </Field>
)

MultiSelectField.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    selected: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    error: PropTypes.bool,
    validationText: PropTypes.string,
}
