import React from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { CheckboxField } from '../CheckboxField'
import styles from '../../styles/Form.module.css'

export const GlobalProgramCompletion = ({ disable, settings, onChange }) => {
    const handleChange = e => {
        onChange({ [e.name]: e.checked })
    }

    return (
        <div className={cx(styles.rowBMargin24, styles.rowTMargin32)}>
            <CheckboxField
                name="visible"
                label={i18n.t(
                    'Show percentage (%) complete in Program toolbar'
                )}
                onChange={handleChange}
                disabled={disable}
                checked={settings.visible}
            />
        </div>
    )
}

GlobalProgramCompletion.propTypes = {
    disable: PropTypes.bool,
    settings: PropTypes.object,
}
