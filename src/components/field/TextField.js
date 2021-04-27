import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { InputField } from '@dhis2/ui'
import { FormSection } from '../sections/general/form-sections'

export const TextField = ({ label, helpText, value, ...props }) => (
    <FormSection>
        <InputField
            inputWidth="300px"
            helpText={helpText}
            label={label}
            value={value}
            {...props}
        />
    </FormSection>
)

TextField.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
}
