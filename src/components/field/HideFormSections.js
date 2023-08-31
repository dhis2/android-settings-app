import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxField } from './CheckboxField'

const CODE = 'collapsibleSections'

export const HideFormSections = ({ settings, handleChange }) => (
    <CheckboxField
        name={CODE}
        label={i18n.t('Hide collapsible sections in forms')}
        onChange={handleChange}
        checked={settings[CODE]}
    />
)

HideFormSections.propTypes = {
    handleChange: PropTypes.func,
    settings: PropTypes.object,
}
