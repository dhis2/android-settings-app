import { FieldGroup, Radio } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

export const RadioGroup = ({
    onChange,
    value,
    name,
    options,
    defaultValues,
    ...props
}) => {
    const [optionSelection, setOptionSelection] = useState(defaultValues)

    useEffect(() => {
        if (value) {
            setOptionSelection({
                ...defaultValues,
                [value]: true,
            })
        } else {
            setOptionSelection(defaultValues)
        }
    }, [value])

    return (
        <FieldGroup {...props}>
            {options.map(option => (
                <Radio
                    dense
                    onChange={onChange}
                    name={name}
                    key={option.value || option.id}
                    label={option.label || option.id}
                    value={option.value || option.id}
                    checked={optionSelection[option.value || option.id]}
                />
            ))}
        </FieldGroup>
    )
}

RadioGroup.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    defaultValues: PropTypes.object,
}
