import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { FieldSection } from '../field'
import { RadioGroup } from './RadioGroup.jsx'

const WHOVisualizationOptions = [
    {
        value: 'HFA',
        label: i18n.t('Height for age'),
    },
    {
        value: 'WFA',
        label: i18n.t('Weight for age'),
    },
    {
        value: 'WFH',
        label: i18n.t('Weight for height'),
    },
]

const whoDefaultValues = {
    HFA: false,
    WFA: false,
    WFH: false,
}

export const WHOVisualizationType = ({ onChange, value }) => {
    const handleChange = (e, key) => {
        let name
        typeof key === 'string' ? (name = key) : (name = e.name)
        onChange({
            ...value,
            [name]: e.value || e.selected,
        })
    }

    return (
        <FieldSection>
            <RadioGroup
                required
                name="chartType"
                label={i18n.t('Choose WHO visualization type')}
                value={value.chartType || ''}
                onChange={handleChange}
                options={WHOVisualizationOptions}
                defaultValues={whoDefaultValues}
            />
        </FieldSection>
    )
}

WHOVisualizationType.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
}
