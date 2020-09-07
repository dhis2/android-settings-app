import React from 'react'
import { InputField } from '@dhis2/ui'

export const InputNumber = ({ data, states, onChange }) => (
    <InputField
        type="number"
        inputWidth="100px"
        name={data.keyDownload}
        max={data.maxValue}
        value={states[data.keyDownload].toString()}
        onChange={onChange}
        disabled={states.disableAll}
    />
)
