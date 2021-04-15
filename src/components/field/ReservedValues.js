import React from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { NumberField } from './NumberField'

const CODE = 'reservedValues'
const MAXVALUE = 500

export const defaultReservedValues = 100

export const ReservedValues = ({ onChange, value, ...props }) => {
    const handleChange = e => {
        let inputValue = e.value
        inputValue = inputValue <= 0 ? 0 : Math.min(MAXVALUE, inputValue)
        onChange({ ...value, [CODE]: inputValue })
    }

    return (
        <NumberField
            label={i18n.t('Reserved values downloaded per TEI attribute')}
            name={CODE}
            onChange={handleChange}
            value={value[CODE]}
            {...props}
        />
    )
}

ReservedValues.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
}
