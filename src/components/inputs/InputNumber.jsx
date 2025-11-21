import i18n from '@dhis2/d2-i18n'
import { InputField } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Invalid.module.css'

export const InputNumber = ({
    onChange,
    keyDownload,
    maxValue,
    value,
    disabled,
    ...props
}) => {
    let warning = ''
    switch (keyDownload) {
        case 'teiDownload':
            warning = i18n.t('Recommended maximum is {{maxValue}} TEI', {
                maxValue,
            })
            break
        case 'eventsDownload':
            warning = i18n.t('Recommended maximum is {{maxValue}} events', {
                maxValue,
            })
            break
    }

    const showWarning = value >= maxValue
    const validationText = showWarning ? warning : ''

    return (
        <div className={cx({ [styles.invalid]: showWarning })}>
            <InputField
                type="number"
                inputWidth="120px"
                warning={showWarning}
                validationText={validationText}
                name={keyDownload}
                value={value.toString()}
                onChange={onChange}
                disabled={disabled}
                {...props}
            />
        </div>
    )
}

InputNumber.propTypes = {
    keyDownload: PropTypes.string,
    maxValue: PropTypes.number || PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}
