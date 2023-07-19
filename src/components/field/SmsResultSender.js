import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { PhoneNumberField } from './PhoneNumberField'

const CODE = 'smsResultSender'

export const SmsResultSender = ({ value, onChange, ...props }) => (
    <PhoneNumberField
        name={CODE}
        label={i18n.t('SMS Result Sender phone number')}
        helpText={i18n.t(
            'Must start with + and be at least 4 characters long.'
        )}
        value={value[CODE]}
        onChange={onChange}
        settingsValue={value}
        {...props}
    />
)

SmsResultSender.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
