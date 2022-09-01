import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { TextAreaField } from './TextAreaField'

const CODE = 'messageOfTheDay'

export const MessageOfDay = ({ value, onChange, disabled }) => {
    const maxlength = (field, size) => field.length > size ? field.substring(0, size) : field

    const handleChange = e => {
        const textValue = maxlength(e.value, 200)
        onChange({ ...value, [CODE]: textValue })
    }

    return (
        <TextAreaField
            name={CODE}
            inputWidth="700px"
            label={i18n.t('Add message of the day')}
            helpText={i18n.t(
                'Use this message to communicate with users in order to display important information'
            )}
            value={value[CODE]}
            onChange={handleChange}
            disabled={disabled}
        />
    )
}

MessageOfDay.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}
