import i18n from '@dhis2/d2-i18n'
import { InputField } from '@dhis2/ui'
import { isNullUndefinedOrEmptyString } from 'd2/lib/check'
import PropTypes from 'prop-types'
import React from 'react'
import { MINIMUM_LOCATION } from '../../constants'
import { FieldSection } from './FieldSection'

export const MinimumLocation = ({ handleChange, settings, ...props }) => {
    const handleValidInput = (e) => {
        const inputValue = isNullUndefinedOrEmptyString(e.value)
            ? null
            : Math.max(0, e.value).toString()

        handleChange({
            name: MINIMUM_LOCATION,
            value: inputValue,
        })
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
                {...props}
            />
        </FieldSection>
    )
}

MinimumLocation.propTypes = {
    handleChange: PropTypes.func,
    settings: PropTypes.object,
}
