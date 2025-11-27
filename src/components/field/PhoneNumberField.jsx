import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { validateNumber, isValidValue } from '../../utils/validators'
import { FieldSection } from './FieldSection.jsx'

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
    const validatePhoneNumber = (e) => {
        const inputValue = e.value

        if (!isValidValue(inputValue)) {
            setError(false)
            return
        }

        const validInput = validateNumber(inputValue)
        setError(!validInput)
    }

    const handleChange = (e) => {
        onChange({ ...props.settingsValue, [props.name]: e.value })
        validatePhoneNumber(e)
    }

    return (
        <FieldSection>
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
        </FieldSection>
    )
}

PhoneNumberField.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    settingsValue: PropTypes.object,
}
