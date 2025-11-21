import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { isValidURL, isValidValue } from '../../utils/validators'
import { TextField } from './TextField.jsx'

const CODE = 'matomoURL'

export const MatomoUrl = ({ value, onChange, disabled }) => {
    const [error, setError] = useState(false)

    const validateURL = (value) => {
        if (isValidValue(value)) {
            const validInput = isValidURL(value)
            !validInput ? setError(true) : setError(false)
        } else {
            setError(false)
        }
    }

    const onChangeUrl = (e) => {
        const inputValue = e.value
        onChange({ ...value, [CODE]: inputValue })
        validateURL(inputValue)
    }

    return (
        <TextField
            name={CODE}
            label={i18n.t('Analytics reporting URL (Matomo)')}
            helpText={i18n.t('Must be a valid url')}
            value={value[CODE]}
            error={error}
            onChange={onChangeUrl}
            disabled={disabled}
        />
    )
}

MatomoUrl.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}
