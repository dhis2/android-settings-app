import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import { FieldGroup, Radio } from '@dhis2/ui'
import map from 'lodash/map'

export const RadioGroup = ({
    onChange,
    value,
    options,
    disabled,
    keyDownload,
    defaultValues,
}) => {
    const [optionSelection, setOptionSelection] = useState(defaultValues)
    const valuesFalsy = map(
        defaultValues,
        (value, key) => (defaultValues[key] = false)
    )

    useEffect(() => {
        if (value) {
            setOptionSelection({
                ...valuesFalsy,
                [value]: true,
            })
        } else {
            setOptionSelection(defaultValues)
        }
    }, [value])

    return (
        <FieldGroup>
            {options.map(option => (
                <Radio
                    dense
                    name={keyDownload}
                    onChange={onChange}
                    checked={optionSelection[option.value || option.id]}
                    key={option.value || option.id}
                    label={option.label || option.id}
                    value={option.value || option.id}
                    disabled={disabled}
                />
            ))}
        </FieldGroup>
    )
}

RadioGroup.propTypes = {
    keyDownload: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
    defaultValues: PropTypes.object,
}
