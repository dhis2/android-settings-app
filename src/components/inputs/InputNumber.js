import React from 'react'
import { InputField } from '@dhis2/ui'
import PropTypes from '@dhis2/prop-types'

export const InputNumber = ({
    onChange,
    keyDownload,
    maxValue,
    value,
    disabled,
    ...props
}) => {
    const max = maxValue && maxValue.toString()

    return (
        <InputField
            type="number"
            inputWidth="100px"
            name={keyDownload}
            max={max}
            value={value.toString()}
            onChange={onChange}
            disabled={disabled}
            {...props}
        />
    )
}

InputNumber.propTypes = {
    keyDownload: PropTypes.string,
    maxValue: PropTypes.number || PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}
