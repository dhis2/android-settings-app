import React from 'react'
import inputNumberStyles from '../styles/InputNumber.module.css'

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
                className={inputNumberStyles.inputBase}
                disabled={disabled}
            />
        </div>
    )
}

export default InputNumber
