import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { Divider } from '@dhis2/ui'
import { WHOVisualizationType } from './WHOVisualizationType'
import { GenderSection } from './GenderSection'
import { AxisSection } from './AxisSection'

export const WHOElements = ({
    handleChange,
    specificSettings,
    attributeOptions,
    edit,
}) => (
    <>
        <WHOVisualizationType
            onChange={handleChange}
            value={specificSettings}
        />

        <Divider />

        <GenderSection
            onChange={handleChange}
            specificSettings={specificSettings}
            attributeOptions={attributeOptions}
            edit={edit}
        />

        <AxisSection
            onChange={handleChange}
            specificSettings={specificSettings}
            legend={i18n.t('Horizontal (x) axis')}
            axis="elementX"
            axisValue="elementValueX"
            edit={edit}
        />

        <AxisSection
            onChange={handleChange}
            specificSettings={specificSettings}
            legend={i18n.t('Vertical (y) axis')}
            axis="elementY"
            axisValue="elementValueY"
            edit={edit}
        />
    </>
)

WHOElements.propTypes = {
    handleChange: PropTypes.func,
    specificSettings: PropTypes.object,
    attributeOptions: PropTypes.array,
    edit: PropTypes.bool,
}
