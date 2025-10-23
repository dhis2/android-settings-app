import i18n from '@dhis2/d2-i18n'
import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { SingleSelect } from '../../components/field'
import styles from './Intent.module.css'

const FieldWrapper = (props) => (
    <div className={styles.row}>{props.children}</div>
)

FieldWrapper.propTypes = {
    children: PropTypes.element,
}

export const extraTypeOptions = [
    {
        value: 'STRING',
        label: i18n.t('String'),
    },
    {
        value: 'INTEGER',
        label: i18n.t('Integer'),
    },
    {
        value: 'BOOLEAN',
        label: i18n.t('Boolean'),
    },
    {
        value: 'FLOAT',
        label: i18n.t('Float'),
    },
    {
        value: 'OBJECT',
        label: i18n.t('JSON object'),
    },
    {
        value: 'LIST_OF_OBJECTS',
        label: i18n.t('List of JSON objects'),
    },
]

export const extraTypesRequiringKey = ['OBJECT', 'LIST_OF_OBJECTS']

const ResponseForm = ({ extrasData = [], onChange, options = {} }) => {
    const handleChange = (index, updatedValues, options) => {
        const updated = extrasData.map((item, idx) => {
            if (idx === index) {
                const withUpdates = { ...item, ...updatedValues }
                if (options?.removeKey) {
                    delete withUpdates[options.removeKey]
                }
                return withUpdates
            }
            return item
        })
        onChange('response.data.extras', updated)
    }
    return (
        <div className={styles.responseForm}>
            <FieldWrapper>
                <InputField
                    label={i18n.t('Extra name')}
                    value={extrasData[0]?.extraName || ''}
                    onChange={(e) => {
                        handleChange(0, { extraName: e.value })
                    }}
                    required
                />
            </FieldWrapper>

            <FieldWrapper>
                <SingleSelect
                    required
                    name="extraType"
                    label={i18n.t('Extra type')}
                    selected={extrasData[0]?.extraType || ''}
                    onChange={(e) => {
                        if (!extraTypesRequiringKey.includes(e.selected)) {
                            handleChange(
                                0,
                                { extraType: e.selected },
                                { removeKey: 'key' }
                            )
                        } else {
                            handleChange(0, { extraType: e.selected })
                        }
                    }}
                    options={extraTypeOptions}
                />
            </FieldWrapper>

            {extraTypesRequiringKey.includes(extrasData[0]?.extraType) && (
                <FieldWrapper>
                    <InputField
                        label={i18n.t('Property in JSON object')}
                        value={extrasData[0]?.key || ''}
                        onChange={(e) => handleChange(0, { key: e.value })}
                        required
                    />
                </FieldWrapper>
            )}
        </div>
    )
}

ResponseForm.propTypes = {
    extrasData: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
}

export default ResponseForm
