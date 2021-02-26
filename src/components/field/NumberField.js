import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { InputField } from '@dhis2/ui'
import { FormSection } from '../sections/general/form-sections'

export const NumberField = ({ label, helpText, value, ...props }) => (
    <FormSection>
        <InputField
            inputWidth="100px"
            type="number"
            label={label}
            helpText={helpText}
            value={value.toString()}
            {...props}
        />
    </FormSection>
)

NumberField.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
}
