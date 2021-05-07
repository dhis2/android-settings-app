import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { SelectField } from './SelectField'

export const SelectDataElement = ({
    specificSettings,
    value,
    handleChange,
    options,
    loading,
    ...props
}) => {
    return (
        <SelectField
            name={value}
            inputWidth="300px"
            label={i18n.t('Choose element')}
            onChange={handleChange}
            value={specificSettings[value] || ''}
            options={loading ? [] : options}
            {...props}
        />
    )
}

SelectDataElement.propTypes = {
    specificSettings: PropTypes.object,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    options: PropTypes.array,
    loading: PropTypes.bool,
}
