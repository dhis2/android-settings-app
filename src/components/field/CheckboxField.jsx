import { CheckboxField as UICheckboxField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FieldSection } from './FieldSection.jsx'

export const CheckboxField = ({
    label,
    helpText,
    name,
    checked,
    disabled,
    onChange,
}) => (
    <FieldSection>
        <UICheckboxField
            label={label}
            helpText={helpText}
            name={name}
            checked={checked}
            disabled={disabled}
            type="checkbox"
            onChange={onChange}
        />
    </FieldSection>
)

CheckboxField.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
}
