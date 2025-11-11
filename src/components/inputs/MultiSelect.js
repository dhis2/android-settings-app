import i18n from '@dhis2/d2-i18n'
import { MultiSelectField, MultiSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export const MultiSelect = ({
    options,
    selected,
    onChange,
    placeholder = i18n.t('Choose an option'),
    ...props
}) => (
    <MultiSelectField
        placeholder={placeholder}
        selected={selected}
        onChange={onChange}
        {...props}
    >
        {options.map((option) => (
            <MultiSelectOption
                key={option.value || option.id}
                label={i18n.t(option.label || option.displayName)}
                value={option.value || option.id}
            />
        ))}
    </MultiSelectField>
)

MultiSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        })
    ).isRequired,
    selected: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
}
