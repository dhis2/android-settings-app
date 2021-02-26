import React, { useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import { InputField } from '@dhis2/ui'
import { FormSection } from '../sections/general/form-sections'
import { validateNumber } from '../../modules/general/validatePhoneNumber'
import { isValidValue } from '../../utils/validators/isValidValue'

export const PhoneNumberField = ({
    label,
    helpText,
    value,
    onChange,
    ...props
}) => {
    const [error, setError] = useState(false)

    /**
     * Checks if sms number or confirmation number is valid
     * validates number
     */
    const validatePhoneNumber = e => {
        const inputValue = e.value

        if (isValidValue(inputValue)) {
            const validInput = validateNumber(inputValue)
            !validInput ? setError(true) : setError(false)
        } else {
            setError(false)
        }
    }

    const handleChange = e => {
        onChange({ ...props.settingsValue, [props.name]: e.value })
        validatePhoneNumber(e)
    }

    return (
        <FormSection>
            <InputField
                type="tel"
                inputWidth="250px"
                helpText={helpText}
                label={label}
                value={value}
                onChange={handleChange}
                error={error}
                {...props}
            />
        </FormSection>
    )
}

PhoneNumberField.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
    onChange: PropTypes.func,
}
