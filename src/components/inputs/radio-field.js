import React from 'react'
import { RadioGroup, Radio } from '@dhis2/ui-core'

export const RadioField = ({ data, onChange, states }) => (
    <RadioGroup
        dense
        name={data.keyDownload}
        id={data.keyDownload}
        onChange={onChange}
        value={states[data.keyDownload]}
        disabled={states.disableAll}
    >
        {data.download.map(option => (
            <Radio
                key={option.value}
                label={option.label}
                value={option.value}
            />
        ))}
    </RadioGroup>
)
