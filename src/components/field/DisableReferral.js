import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { DISABLE_REFERRALS } from '../../constants'
import { CheckboxField } from './CheckboxField'
import { HelpText } from './HelpText'

export const DisableReferral = ({
    isTrackerProgram,
    handleChange,
    settings,
}) => (
    <>
        {isTrackerProgram && (
            <CheckboxField
                name={DISABLE_REFERRALS}
                label={
                    <HelpText
                        helpText={i18n.t('Disable TEI referrals.')}
                        warning={i18n.t(
                            'Only applicable for users using Android app version 2.9 or later.'
                        )}
                        version={i18n.t('2.9 +')}
                        type="info"
                    />
                }
                onChange={handleChange}
                checked={settings[DISABLE_REFERRALS]}
            />
        )}
    </>
)

DisableReferral.propTypes = {
    isTrackerProgram: PropTypes.bool,
    handleChange: PropTypes.func,
    settings: PropTypes.object,
}
