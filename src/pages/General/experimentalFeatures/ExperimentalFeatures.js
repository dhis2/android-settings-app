import i18n from '@dhis2/d2-i18n'
import { Legend } from '@dhis2/ui'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { CheckboxField } from '../../../components/field'
import { MoreOptions } from '../../../components/moreOptions'
import { getValidKeysList } from '../helper'
import styles from './ExperimentalFeatures.module.css'
import { featureList } from './feature-list'

const CODE = 'experimentalFeatures'

/**
 * Create an object based on elements of "featureList"
 * */
const populateOptions = (list) =>
    featureList?.reduce((options, e) => {
        options[e.name] = !isEmpty(list) && list.includes(e.name)
        return options
    }, {})

export const ExperimentalFeatures = ({ onChange, value, ...props }) => {
    const [options, setOptions] = useState({})

    useEffect(() => {
        setOptions(populateOptions(value[CODE]))
    }, [value[CODE]])

    const handleCheckbox = useCallback((e) => {
        const optionsToSave = {
            ...options,
            [e.name]: e.checked,
        }
        setOptions({ ...optionsToSave })
        onChange({ ...value, [CODE]: getValidKeysList(optionsToSave) })
    }, [])

    return (
        <>
            <MoreOptions>
                <>
                    <Legend className={styles.container}>
                        {i18n.t(
                            'The Android Capture app has helpful new and experimental features that can be enable.'
                        )}
                    </Legend>

                    {featureList.map(({ name, label, description }) => (
                        <CheckboxField
                            key={name}
                            name={name}
                            label={label}
                            helpText={description}
                            checked={options[name]}
                            onChange={handleCheckbox}
                            {...props}
                        />
                    ))}
                </>
            </MoreOptions>
        </>
    )
}

ExperimentalFeatures.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
