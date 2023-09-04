import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { COLLAPSIBLE_SECTIONS } from '../../constants'
import { CheckboxField } from './CheckboxField'

export const HideFormSections = ({ settings, handleChange }) => (
    <CheckboxField
        name={COLLAPSIBLE_SECTIONS}
        label={i18n.t('Hide collapsible sections in forms')}
        onChange={handleChange}
        checked={settings[COLLAPSIBLE_SECTIONS]}
    />
)

HideFormSections.propTypes = {
    handleChange: PropTypes.func,
    settings: PropTypes.object,
}
