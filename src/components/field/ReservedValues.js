import React from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { NumberField } from './NumberField'

const CODE = 'reservedValues'
const MAXVALUE = 500

export const defaultReservedValues = 100

export const ReservedValues = ({ onChange, value, ...props }) => {
    const handleChange = e => {
        const inputValue = Math.max(
            0,
            isNaN(parseInt(e.value)) ? 0 : parseInt(e.value)
        )
        onChange({ ...value, [CODE]: inputValue })
    }

    return (
        <NumberField
            label={i18n.t('Reserved values downloaded per TEI attribute')}
            name={CODE}
            onChange={handleChange}
            value={value[CODE]}
            warning={value[CODE] >= MAXVALUE}
            step="10"
            inputWidth="120px"
            validationText={i18n.t(
                'It is recommended a maximum of {{maxValue}} reserved values',
                { maxValue: MAXVALUE }
            )}
            {...props}
        />
    )
}

ReservedValues.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
}
