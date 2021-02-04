import React from 'react'
import { InputField } from '@dhis2/ui'
import PropTypes from '@dhis2/prop-types'

export const InputNumber = ({
    onChange,
    keyDownload,
    maxValue,
    value,
    disabled,
}) => (
    <InputField
        type="number"
        inputWidth="100px"
        name={keyDownload}
        max={maxValue}
        value={value.toString()}
        onChange={onChange}
        disabled={disabled}
    />
)

InputNumber.propTypes = {
    keyDownload: PropTypes.string,
    maxValue: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}
