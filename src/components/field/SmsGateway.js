import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { PhoneNumberField } from './PhoneNumberField'

const CODE = 'smsGateway'

export const SmsGateway = ({ value, onChange, ...props }) => (
    <PhoneNumberField
        name={CODE}
        label={i18n.t('SMS Gateway phone number')}
        helpText={i18n.t(
            'Must start with + and be at least 4 characters long.'
        )}
        value={value[CODE]}
        onChange={onChange}
        settingsValue={value}
        {...props}
    />
)

SmsGateway.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
