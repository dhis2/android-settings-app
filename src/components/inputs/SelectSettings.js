import PropTypes from 'prop-types'
import React from 'react'
import { Select } from './Select'

export const SelectSettings = ({
    onChange,
    label,
    keyDownload,
    value,
    disabled,
    options,
}) => (
    <Select
        key={keyDownload}
        inputWidth="200px"
        label={label}
        name={keyDownload}
        value={value}
        disabled={disabled}
        onChange={onChange}
        options={options}
    />
)

SelectSettings.propTypes = {
    keyDownload: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
}
