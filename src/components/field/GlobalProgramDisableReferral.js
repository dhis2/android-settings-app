import i18n from '@dhis2/d2-i18n'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxField } from './CheckboxField'
import styles from './Field.module.css'

const CODE = 'disableReferral'

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
                name={CODE}
                label={i18n.t('Disable TEI referrals')}
                onChange={handleChange}
                disabled={disable}
                checked={settings[CODE]}
            />
        </div>
    )
}

GlobalProgramDisableReferral.propTypes = {
    disable: PropTypes.bool,
    settings: PropTypes.object,
    onChange: PropTypes.func,
}
