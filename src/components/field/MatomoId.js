import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { NumberField } from './NumberField'

const CODE = 'matomoID'

export const MatomoId = ({ value, onChange, disabled }) => {
    const handleChange = e => {
        let inputValue = e.value
        inputValue = Math.max(0, inputValue)
        onChange({ ...value, [CODE]: inputValue })
    }

    return (
        <NumberField
            label={i18n.t('Analytics reporting ID (Matomo)')}
            name={CODE}
            helpText={i18n.t('Must be at least 1 character long')}
            value={value[CODE]}
            onChange={handleChange}
            disabled={disabled}
        />
    )
}

MatomoId.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}
