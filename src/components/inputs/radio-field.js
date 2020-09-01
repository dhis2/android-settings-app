import React from 'react'
import { RadioGroup, Radio } from '@dhis2/ui-core'
import radioStyles from '../../styles/Input.module.css'

export const RadioField = ({ data, onChange, states }) => (
    <RadioGroup
        dense
        name={data.keyDownload}
        id={data.keyDownload}
        onChange={onChange}
        value={states[data.keyDownload]}
        className={radioStyles.container_content_inline}
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
