import React from 'react'
import { Select } from './select'

export const SelectSettings = ({ data, onChange, states, label }) => (
    <Select
        key={data.keyDownload}
        inputWidth="200px"
        label={label}
        name={data.keyDownload}
        value={states[data.keyDownload]}
        disabled={states.disableAll}
        onChange={onChange}
        options={data.download}
    />
)
