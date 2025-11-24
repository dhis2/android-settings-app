import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FieldSection } from './FieldSection.jsx'

export const NumberField = ({ label, helpText, value, ...props }) => (
    <FieldSection>
        <InputField
            inputWidth="100px"
            type="number"
            label={label}
            helpText={helpText}
            value={value.toString()}
            {...props}
        />
    </FieldSection>
)

NumberField.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
