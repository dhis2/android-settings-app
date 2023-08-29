import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxField } from './CheckboxField'

const CODE = 'disableReferral'

export const DisableReferral = ({ handleChange, settings }) => (
    <CheckboxField
        name={CODE}
        label={i18n.t('Disable TEI referrals')}
        onChange={handleChange}
        checked={settings[CODE]}
    />
)

DisableReferral.propTypes = {
    handleChange: PropTypes.func,
    settings: PropTypes.object,
}
