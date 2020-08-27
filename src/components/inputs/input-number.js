import React from 'react'
import { InputField } from '@dhis2/ui'

const InputNumber = ({ data, states, onChange }) => (
    <InputField
        type="number"
        inputWidth="100px"
        name={data.keyDownload}
        max={data.maxValue}
        value={states[data.keyDownload]}
        onChange={onChange}
        disabled={states.disableAll}
    />
)

export default InputNumber
