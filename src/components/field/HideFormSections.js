import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { COLLAPSIBLE_SECTIONS } from '../../constants'
import { CheckboxField } from './CheckboxField'
import { HelpText } from './HelpText'

export const HideFormSections = ({ settings, handleChange }) => (
    <CheckboxField
        name={COLLAPSIBLE_SECTIONS}
        label={
            <HelpText
                helpText={i18n.t('Do not collapse sections in form.')}
                warning={i18n.t(
                    'Only applicable for users using Android app version 2.9 or later.'
                )}
                type="info"
                version={i18n.t('2.9 +')}
            />
        }
        onChange={handleChange}
        checked={settings[COLLAPSIBLE_SECTIONS]}
    />
)

HideFormSections.propTypes = {
    handleChange: PropTypes.func,
    settings: PropTypes.object,
}
