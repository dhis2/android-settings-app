import i18n from '@dhis2/d2-i18n'
import { InputField } from '@dhis2/ui'
import { isNullUndefinedOrEmptyString } from 'd2/lib/check'
import PropTypes from 'prop-types'
import React from 'react'
import { FieldSection } from './FieldSection'

const CODE = 'fileMaxLengthBytes'
export const FileMaxSize = ({ onChange, value, ...props }) => {
    const handleChange = (e) => {
        onChange({ ...value, [CODE]: e.value })
    }

    return (
        <FieldSection>
            <InputField
                inputWidth="120px"
                type="number"
                label={i18n.t('Maximum file size limit for download (Kb)')}
                name={CODE}
                value={
                    isNullUndefinedOrEmptyString(value[CODE])
                        ? null
                        : value[CODE].toString()
                }
                onChange={handleChange}
                step="100"
                min="0"
                {...props}
            />
        </FieldSection>
    )
}

FileMaxSize.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
}
