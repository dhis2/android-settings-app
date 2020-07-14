import React from 'react'
import cx from 'classnames'
import inputNumberStyles from '../styles/InputNumber.module.css'
import disableStyle from '../styles/Disable.module.css'

const InputNumber = ({ name, max, value, onChange, disabled }) => {
    return (
        <div className={inputNumberStyles.inputContainer}>
            <input
                id={name}
                name={name}
                type="number"
                min="0"
                step="10"
                max={max}
                value={value}
                onChange={onChange}
                className={cx(inputNumberStyles.inputBase, {
                    [disableStyle.disable_input]: disabled,
                })}
                disabled={disabled}
            />
        </div>
    )
}

export default InputNumber
