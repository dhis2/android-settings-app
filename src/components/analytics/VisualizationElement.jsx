import i18n from '@dhis2/d2-i18n'
import { Divider } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { isValidValue } from '../../utils/validators'
import { Section } from './Section.jsx'
import { SelectDataElement } from './SelectDataElement.jsx'
import { SelectElementType } from './SelectElementType.jsx'
import { SelectField } from './SelectField.jsx'

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
        value: 'Daily',
        label: i18n.t('Daily'),
    },
    {
        value: 'Weekly',
        label: i18n.t('Weekly'),
    },
    {
        value: 'Monthly',
        label: i18n.t('Monthly'),
    },
    {
        value: 'Quarterly',
        label: i18n.t('Quarterly'),
    },
    {
        value: 'SixMonthly',
        label: i18n.t('Six-monthly'),
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

export const VisualizationElement = ({
    handleChange,
    specificSettings,
    edit,
}) => {
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
                required
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
                    edit={edit}
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
                    edit={edit}
                />
            </Section>
        </>
    )
}

VisualizationElement.propTypes = {
    handleChange: PropTypes.func,
    specificSettings: PropTypes.object,
}
