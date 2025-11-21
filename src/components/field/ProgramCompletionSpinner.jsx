import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxField } from './CheckboxField.jsx'

const CODE = 'completionSpinner'

export const ProgramCompletionSpinner = ({ handleChange, settings }) => (
    <CheckboxField
        name={CODE}
        label={i18n.t('Show percentage (%) complete in Program toolbar')}
        onChange={handleChange}
        checked={settings[CODE]}
    />
)

ProgramCompletionSpinner.propTypes = {
    handleChange: PropTypes.func,
    settings: PropTypes.object,
}
