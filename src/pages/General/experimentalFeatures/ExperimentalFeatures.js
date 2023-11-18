import i18n from '@dhis2/d2-i18n'
import React, { useEffect, useState } from 'react'
import { CheckboxField } from '../../../components/field'
import { MoreOptions } from '../../../components/moreOptions'
import { getFeaturesList } from '../helper'
import { featureList } from './feature-list'

const CODE = 'experimentalFeatures'
export const ExperimentalFeatures = ({ onChange, value, ...props }) => {
    const [options, setOptions] = useState({
        test: false,
        test2: false,
        test3: true,
    })

    useEffect(() => {
        const a = getFeaturesList(options)
        console.log({ a })
    }, [options])

    const handleCheckbox = (e) => {
        console.log(e)
        setOptions({ ...options, [e.name]: e.checked })

        onChange({ ...value, [CODE]: '' })

        //onChange({ ...value, [CODE]: e.checked })
    }

    return (
        <>
            <MoreOptions>
                <>
                    {featureList.map(({ name, label, description }) => (
                        <Feature
                            key={name}
                            name={name}
                            label={label}
                            description={description}
                            value={options}
                            onChange={handleCheckbox}
                            {...props}
                        />
                    ))}
                </>
            </MoreOptions>
        </>
    )
}

const Feature = ({ name, label, description, value, onChange, ...props }) => {
    return (
        <CheckboxField
            name={name}
            label={label}
            helpText={description}
            checked={value[name]}
            onChange={onChange}
            {...props}
        />
    )
}
