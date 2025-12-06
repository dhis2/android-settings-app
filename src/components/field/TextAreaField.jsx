import { TextAreaField as TextArea } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FieldSection } from './FieldSection.jsx'

export const TextAreaField = ({ onChange, ...props }) => (
    <FieldSection>
        <TextArea onChange={onChange} {...props} />
    </FieldSection>
)

TextAreaField.propTypes = {
    onChange: PropTypes.func,
}
