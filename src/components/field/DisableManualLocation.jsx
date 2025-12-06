import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { DISABLE_MANUAL_LOCATION } from '../../constants'
import { CheckboxField } from './CheckboxField.jsx'

export const DisableManualLocation = ({ handleChange, settings }) => (
    <CheckboxField
        name={DISABLE_MANUAL_LOCATION}
        label={i18n.t('Disable manual location capture')}
        onChange={handleChange}
        checked={settings[DISABLE_MANUAL_LOCATION]}
    />
)

DisableManualLocation.propTypes = {
    handleChange: PropTypes.func,
    settings: PropTypes.object,
}
