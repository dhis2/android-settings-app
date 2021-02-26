import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { PhoneNumberField } from './PhoneNumberField'

const CODE = 'smsResultSender'
const LABEL = i18n.t('SMS Result Sender phone number')
const HELPTEXT = i18n.t('Must start with + and be at least 4 characters long.')

export const SmsResultSender = ({ value, onChange, ...props }) => (
    <PhoneNumberField
        name={CODE}
        label={LABEL}
        helpText={HELPTEXT}
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
