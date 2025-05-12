import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FieldSection } from './FieldSection'

export const TextField = ({ label, helpText, value, required, ...props }) => {
    console.log({props})
    return(
    <FieldSection>
        <InputField
            inputWidth="300px"
            helpText={helpText}
            label={label}
            value={value}
            {...props}
        />
    </FieldSection>
)}


TextField.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
}
