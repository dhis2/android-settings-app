import React from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'
import { InputField } from '@dhis2/ui'
import PropTypes from '@dhis2/prop-types'
import styles from './Invalid.module.css'

export const InputNumber = ({
    onChange,
    keyDownload,
    maxValue,
    value,
    disabled,
    ...props
}) => {
    let key = ''

    switch (keyDownload) {
        case 'teiDownload':
            key = 'TEI'
            break
        case 'eventsDownload':
            key = 'events'
            break
    }

    const showWarning = value >= maxValue
    const validationText = showWarning
        ? i18n.t(
              'It is recommended to download a maximum of {{maxValue}} {{key}}',
              { maxValue, key }
          )
        : ''

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
