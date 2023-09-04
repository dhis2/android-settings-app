import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { DISABLE_REFERRALS } from '../../constants'
import { CheckboxField } from './CheckboxField'

export const DisableReferral = ({
    isTrackerProgram,
    handleChange,
    settings,
}) => (
    <>
        {isTrackerProgram && (
            <CheckboxField
                name={DISABLE_REFERRALS}
                label={i18n.t('Disable TEI referrals')}
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
