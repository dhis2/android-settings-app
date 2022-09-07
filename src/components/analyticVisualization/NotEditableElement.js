import PropTypes from 'prop-types'
import React from 'react'
import { TextField } from '../field'

export const NotEditableElement = ({ name, label, value }) => (
    <TextField
        dense
        inputWidth="350px"
        name={name}
        label={label}
        value={value}
        disabled
    />
)

NotEditableElement.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
}
