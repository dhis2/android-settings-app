import i18n from '@dhis2/d2-i18n'
import { InputField } from '@dhis2/ui'
import { isNullUndefinedOrEmptyString } from 'd2/lib/check'
import PropTypes from 'prop-types'
import React from 'react'
import { FieldSection } from './FieldSection'
import { HelpText } from './HelpText'

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
                label={
                    <HelpText
                        helpText={i18n.t(
                            'Maximum file size limit for download (Kb)'
                        )}
                        warning={i18n.t(
                            'Only applicable for users using Android app version 2.8 or later.'
                        )}
                        type="info"
                        version={i18n.t('2.8 +')}
                    />
                }
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
