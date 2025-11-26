import i18n from '@dhis2/d2-i18n'
import { Legend } from '@dhis2/ui'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { CheckboxField, HelpText } from '../../../components/field'
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
    const experimentalValue = value[CODE]

    const options = useMemo(
        () => populateOptions(experimentalValue),
        [experimentalValue]
    )

    const handleCheckbox = (e) => {
        const optionsToSave = {
            ...options,
            [e.name]: e.checked,
        }
        onChange({ ...value, [CODE]: getValidKeysList(optionsToSave) })
    }

    return (
        <MoreOptions>
            <>
                <Legend className={styles.container}>
                    {i18n.t(
                        'The Android Capture app has helpful new and experimental features that can be enabled.'
                    )}
                </Legend>

                {featureList.map(
                    ({ name, label, description, warning, version }) => (
                        <CheckboxField
                            key={name}
                            name={name}
                            label={label}
                            helpText={
                                <HelpText
                                    helpText={description}
                                    warning={warning}
                                    type={warning ? 'info' : undefined}
                                    version={version}
                                />
                            }
                            checked={options[name]}
                            onChange={handleCheckbox}
                            {...props}
                        />
                    )
                )}
            </>
        </MoreOptions>
    )
}

ExperimentalFeatures.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
