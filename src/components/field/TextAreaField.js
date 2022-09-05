import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { TextAreaField as TextArea } from '@dhis2/ui'
import { FieldSection } from './FieldSection'

export const TextAreaField = ({ onChange, ...props }) => (
    <FieldSection>
        <TextArea onChange={onChange} {...props} />
    </FieldSection>
)

TextAreaField.propTypes = {
    onChange: PropTypes.func,
}
