import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { NumberField } from './NumberField'

const CODE = 'fileMaxLengthBytes'
export const FileMaxSize = ({ onChange, value, ...props }) => {
    const handleChange = (e) => {
        onChange({ ...value, [CODE]: e.value })
    }

    return (
        <NumberField
            label={i18n.t('Maximum file size limit for download (Kb)')}
            name={CODE}
            value={value[CODE]}
            onChange={handleChange}
            step="100"
            min="0"
            inputWidth="120px"
            {...props}
        />
    )
}

FileMaxSize.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
}
