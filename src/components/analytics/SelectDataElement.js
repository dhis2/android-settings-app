import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { CircularLoader } from '@dhis2/ui'
import { SelectField } from './SelectField'
import { isValidValue } from '../../utils/validators'

export const SelectDataElement = ({
    specificSettings,
    value,
    handleChange,
    options,
    loading,
    edit,
    ...props
}) => {
    const [load, setLoad] = useState(true)

    /**
     * In Edit mode, Circular loader should be shown when option list is ready
     * */
    useEffect(() => {
        if (edit && options) {
            options.length === 0 && isValidValue(specificSettings[value])
                ? setLoad(true)
                : setLoad(false)
        }
    }, [options, edit])

    if (edit && load) return <CircularLoader small />

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
    edit: PropTypes.bool,
}
