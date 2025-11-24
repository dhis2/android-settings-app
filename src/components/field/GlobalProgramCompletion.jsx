import i18n from '@dhis2/d2-i18n'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxField } from './CheckboxField.jsx'
import styles from './Field.module.css'

const CODE = 'completionSpinner'

export const GlobalProgramCompletion = ({ disable, settings, onChange }) => {
    const handleChange = (e) => {
        onChange({
            ...settings,
            [e.name]: e.checked,
        })
    }

    return (
        <div className={cx(styles.rowBMargin24, styles.rowTMargin32)}>
            <CheckboxField
                name={CODE}
                label={i18n.t(
                    'Show percentage (%) complete in Program toolbar'
                )}
                onChange={handleChange}
                disabled={disable}
                checked={settings.visible || settings[CODE]}
            />
        </div>
    )
}

GlobalProgramCompletion.propTypes = {
    disable: PropTypes.bool,
    settings: PropTypes.object,
    onChange: PropTypes.func,
}
