import i18n from '@dhis2/d2-i18n'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { DISABLE_REFERRALS } from '../../constants'
import { CheckboxField } from './CheckboxField'
import styles from './Field.module.css'
import { HelpText } from './HelpText'

export const GlobalProgramDisableReferral = ({
    disable,
    settings,
    onChange,
}) => {
    const handleChange = (e) => {
        onChange({
            ...settings,
            [e.name]: e.checked,
        })
    }

    return (
        <div className={cx(styles.rowBMargin24)}>
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
                disabled={disable}
                checked={settings[DISABLE_REFERRALS]}
            />
        </div>
    )
}

GlobalProgramDisableReferral.propTypes = {
    disable: PropTypes.bool,
    settings: PropTypes.object,
    onChange: PropTypes.func,
}
