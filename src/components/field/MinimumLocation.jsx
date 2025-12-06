import i18n from '@dhis2/d2-i18n'
import { InputField } from '@dhis2/ui'
import { isNullUndefinedOrEmptyString } from 'd2/lib/check'
import PropTypes from 'prop-types'
import React from 'react'
import { MINIMUM_LOCATION } from '../../constants'
import { FieldSection } from './FieldSection.jsx'

export const MinimumLocation = ({ handleChange, settings, ...props }) => {
    const handleValidInput = (e) => {
        const inputValue = e.value

        // Allow clearing the input to set the value to null
        if (isNullUndefinedOrEmptyString(inputValue)) {
            handleChange({ name: MINIMUM_LOCATION, value: null })
            return
        }

        // Check if the value is a valid positive number within the range
        const numericValue = Number(inputValue)
        if (
            !Number.isNaN(numericValue) &&
            numericValue >= 1 &&
            numericValue <= 99
        ) {
            handleChange({
                name: MINIMUM_LOCATION,
                value: numericValue.toString(),
            })
        }
    }

    return (
        <FieldSection>
            <InputField
                dense
                inputWidth="120px"
                type="number"
                label={i18n.t('Minimum location accuracy (m)')}
                helpText={i18n.t(
                    'Configure the minimum precision level for location capture'
                )}
                name={MINIMUM_LOCATION}
                value={settings[MINIMUM_LOCATION]}
                onChange={(e) => handleValidInput(e)}
                step="5"
                min="5"
                max="99"
                {...props}
            />
        </FieldSection>
    )
}

MinimumLocation.propTypes = {
    handleChange: PropTypes.func,
    settings: PropTypes.object,
}
