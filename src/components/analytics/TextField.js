import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FieldSection } from '../field'

export const TextField = ({ value, onChange, ...props }) => (
    <FieldSection>
        <InputField
            dense
            inputWidth="300px"
            onChange={onChange}
            value={value}
            {...props}
        />
    </FieldSection>
)

TextField.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
}
