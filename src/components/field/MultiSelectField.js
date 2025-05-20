import i18n from '@dhis2/d2-i18n'
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
        label={i18n.t(label)}
        required={required}
        error={error}
        validationText={error ? i18n.t(validationText) : ''}
    >
        <MultiSelect
            placeholder={i18n.t('Choose an option')}
            selected={selected}
            onChange={onChange}
            {...props}
        >
            {options.map((option) => (
                <MultiSelectOption
                    key={option.value}
                    label={i18n.t(option.label)}
                    value={option.value}
                />
            ))}
        </MultiSelect>
    </Field>
)

MultiSelectField.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    selected: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    error: PropTypes.bool,
    validationText: PropTypes.string,
}
