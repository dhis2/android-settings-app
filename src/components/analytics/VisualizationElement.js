import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { Divider } from '@dhis2/ui'
import { isValidValue } from '../../utils/validators/isValidValue'
import { Section } from './Section'
import { SelectField } from './SelectField'
import { SelectDataElement } from './SelectDataElement'
import { SelectElementType } from './SelectElementType'

const elementTypeOptions = [
    {
        value: 'dataElements',
        label: i18n.t('Data Element'),
    },
    {
        value: 'programIndicators',
        label: i18n.t('Program Indicator'),
    },
    {
        value: 'attributes',
        label: i18n.t('Attribute'),
    },
]

const periodType = [
    {
        value: 'Monthly',
        label: i18n.t('Monthly'),
    },
    {
        value: 'Daily',
        label: i18n.t('Daily'),
    },
    {
        value: 'Weekly',
        label: i18n.t('Weekly'),
    },
    {
        value: 'Quarterly',
        label: i18n.t('Quarterly'),
    },
    {
        value: 'SixMontly',
        label: i18n.t('SixMontly'),
    },
    {
        value: 'Yearly',
        label: i18n.t('Yearly'),
    },
    {
        value: 'None',
        label: i18n.t('None'),
    },
]

export const VisualizationElement = ({ handleChange, specificSettings }) => {
    const [elementList, setElementList] = useState([])
    const [loading, setLoading] = useState(true)

    const onChange = (e, key) => {
        key === 'element'
            ? handleChange({
                  ...specificSettings,
                  elementValue: '',
                  [key]: e.value || e.selected,
              })
            : handleChange({
                  ...specificSettings,
                  [key]: e.value || e.selected,
              })
    }

    return (
        <>
            <SelectField
                name="period"
                inputWidth="300px"
                label={i18n.t('Choose a period type')}
                onChange={onChange}
                value={specificSettings.period || ''}
                options={periodType}
            />
            <Divider />
            <Section legend={i18n.t('Visualization elements')}>
                <SelectElementType
                    value="element"
                    handleChange={onChange}
                    elementValueOptions={elementList}
                    handleList={setElementList}
                    specificSettings={specificSettings}
                    options={elementTypeOptions}
                    disabled={!isValidValue(specificSettings.programStage)}
                    handleLoading={setLoading}
                />

                <SelectDataElement
                    value="elementValue"
                    options={elementList}
                    handleChange={onChange}
                    specificSettings={specificSettings}
                    disabled={
                        !isValidValue(specificSettings.element) ||
                        !isValidValue(specificSettings.type)
                    }
                    loading={loading}
                />
            </Section>
        </>
    )
}

VisualizationElement.propTypes = {
    handleChange: PropTypes.func,
    specificSettings: PropTypes.object,
}
