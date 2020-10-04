import React from 'react'
import { RadioGroup, Radio } from '@dhis2/ui-core'
import PropTypes from '@dhis2/prop-types'

export const RadioField = ({
    onChange,
    keyDownload,
    value,
    disabled,
    options,
}) => (
    <RadioGroup
        dense
        name={keyDownload}
        id={keyDownload}
        onChange={onChange}
        value={value}
        disabled={disabled}
    >
        {options.map(option => (
            <Radio
                key={option.value}
                label={option.label}
                value={option.value}
            />
        ))}
    </RadioGroup>
)

RadioField.propTypes = {
    keyDownload: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
}
