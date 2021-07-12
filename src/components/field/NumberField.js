import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { InputField } from '@dhis2/ui'
import { FieldSection } from './FieldSection'

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
}
