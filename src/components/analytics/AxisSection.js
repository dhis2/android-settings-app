import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { isValidValue } from '../../utils/validators'
import { Section } from './Section'
import { SelectDataElement } from './SelectDataElement'
import { SelectElementType } from './SelectElementType'

const elementTypeOptionsWHO = [
    {
        value: 'dataElements',
        label: i18n.t('Data Element'),
    },
    {
        value: 'programIndicators',
        label: i18n.t('Program Indicator'),
    },
]

export const AxisSection = ({
    onChange,
    specificSettings,
    legend,
    axis,
    axisValue,
    edit,
}) => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const handleChange = (e, key) => {
        let name
        typeof key === 'string' ? (name = key) : (name = e.name)
        name === axis
            ? onChange({
                  ...specificSettings,
                  [axisValue]: '',
                  [name]: e.value || e.selected,
              })
            : onChange({
                  ...specificSettings,
                  [name]: e.value || e.selected,
              })
    }

    return (
        <Section legend={legend}>
            <SelectElementType
                value={axis}
                handleChange={handleChange}
                elementValueOptions={list}
                handleList={setList}
                specificSettings={specificSettings}
                options={elementTypeOptionsWHO}
                disabled={!isValidValue(specificSettings.programStage)}
                handleLoading={setLoading}
                edit={edit}
            />

            <SelectDataElement
                value={axisValue}
                options={list}
                handleChange={handleChange}
                specificSettings={specificSettings}
                disabled={!isValidValue(specificSettings[axis])}
                loading={loading}
                edit={edit}
            />
        </Section>
    )
}

AxisSection.propTypes = {
    onChange: PropTypes.func,
    specificSettings: PropTypes.object,
    legend: PropTypes.string,
    axis: PropTypes.string,
    axisValue: PropTypes.string,
    edit: PropTypes.bool,
}
