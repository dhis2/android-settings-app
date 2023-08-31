import i18n from '@dhis2/d2-i18n'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxField } from './CheckboxField'
import styles from './Field.module.css'
import { GlobalProgramDisableReferral } from './GlobalProgramDisableReferral'

const CODE = 'collapsibleSections'

export const GlobalProgramHideSections = ({ disable, settings, onChange }) => {
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
                label={i18n.t('Hide collapsible sections in forms')}
                onChange={handleChange}
                disabled={disable}
                checked={settings.visible || settings[CODE]}
            />
        </div>
    )
}

GlobalProgramDisableReferral.propTypes = {
    disable: PropTypes.bool,
    settings: PropTypes.object,
    onChange: PropTypes.func,
}
