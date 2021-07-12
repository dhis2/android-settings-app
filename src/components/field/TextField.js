import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { InputField } from '@dhis2/ui'
import { FieldSection } from './FieldSection'

export const TextField = ({ label, helpText, value, ...props }) => (
    <FieldSection>
        <InputField
            inputWidth="300px"
            helpText={helpText}
            label={label}
            value={value}
            {...props}
        />
    </FieldSection>
)

TextField.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
}
