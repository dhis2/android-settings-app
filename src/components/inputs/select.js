import React from 'react'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'

export const Select = ({ data, onChange, states, label }) => (
    <SingleSelectField
        inputWidth="200px"
        key={data.keyDownload}
        label={label}
        selected={states[data.keyDownload]}
        onChange={e => onChange(e, data.keyDownload)}
        id={data.keyDownload}
        name={data.keyDownload}
        disabled={states.disableAll}
    >
        {data.download.map(option => (
            <SingleSelectOption
                key={option.value}
                label={option.label}
                value={option.value}
            />
        ))}
    </SingleSelectField>
)
