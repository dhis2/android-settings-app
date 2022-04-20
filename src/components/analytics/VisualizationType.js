import React, { useEffect } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { RadioGroup } from './RadioGroup'
import { FieldSection } from '../field'
import {
    createInitialValues,
    updateAttributesList,
    WHO_NUTRITION,
} from '../../pages/Analytics/TEI/helper'
import { useReadAttributesQuery } from '../../pages/Analytics/TEI/AnalyticsQueries'

const visualizationOptions = [
    {
        value: 'BAR',
        label: i18n.t('Bar chart'),
    },
    {
        value: 'LINE',
        label: i18n.t('Line chart'),
    },
    {
        value: 'TABLE',
        label: i18n.t('Pivot table'),
    },
    {
        value: 'SINGLE_VALUE',
        label: i18n.t('Single value'),
    },
    {
        value: 'WHO_NUTRITION',
        label: i18n.t('WHO nutrition'),
    },
]

const defaultValues = {
    CHART: false,
    LINE: false,
    TABLE: false,
    SINGLE_VALUE: false,
    WHO_NUTRITION: false,
}

export const VisualizationType = ({
    onChange,
    value,
    handleWHOAttribute,
    edit,
}) => {
    const { refetch } = useReadAttributesQuery({})

    useEffect(() => {
        if (edit && value.type === WHO_NUTRITION) {
            updateAttributesList({
                programId: value.program,
                refetch,
                updateList: handleWHOAttribute,
                isWHO: true,
            })
        }
    }, [])

    const handleChange = e => {
        if (e.selected || e.value === WHO_NUTRITION) {
            updateAttributesList({
                programId: value.program,
                refetch,
                updateList: handleWHOAttribute,
                isWHO: true,
            })

            onChange({
                ...createInitialValues(''),
                program: value.program,
                programStage: value.programStage,
                [e.name]: e.selected || e.value,
            })
        } else {
            onChange({
                ...value,
                [e.name]: e.selected || e.value,
            })
        }
    }

    return (
        <FieldSection>
            <RadioGroup
                required
                name="type"
                label={i18n.t('Choose visualization type')}
                value={value.type || ''}
                onChange={handleChange}
                options={visualizationOptions}
                defaultValues={defaultValues}
            />
        </FieldSection>
    )
}

VisualizationType.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
    handleWHOAttribute: PropTypes.func,
    edit: PropTypes.bool,
}
