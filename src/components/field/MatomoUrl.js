import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { TextField } from './TextField'
import { isValidURL } from '../../utils/validators/isValidURL'
import { isValidValue } from '../../utils/validators/isValidValue'

const CODE = 'matomoURL'
const LABEL = i18n.t('Analytics reporting URL (Matomo)')
const HELPTEXT = i18n.t('Must be a valid url')

export const MatomoUrl = ({ value, onChange }) => {
    const [error, setError] = useState(false)

    const validateURL = value => {
        if (isValidValue(value)) {
            const validInput = isValidURL(value)
            !validInput ? setError(true) : setError(false)
        } else {
            setError(false)
        }
    }

    const onChangeUrl = e => {
        const inputValue = e.value
        onChange({ ...value, [CODE]: inputValue })
        validateURL(inputValue)
    }

    return (
        <TextField
            name={CODE}
            label={LABEL}
            helpText={HELPTEXT}
            value={value[CODE]}
            error={error}
            onChange={onChangeUrl}
        />
    )
}

MatomoUrl.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
