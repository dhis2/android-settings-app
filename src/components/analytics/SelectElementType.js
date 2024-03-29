import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import {
    useReadAttributesQuery,
    useReadDataElementsQuery,
    useReadProgramIndicatorsQuery,
} from '../../pages/Analytics/TEI/AnalyticsQueries'
import {
    updateAttributesList,
    updateDataElementsList,
    updateProgramIndicatorsList,
} from '../../pages/Analytics/TEI/helper'
import { SelectField } from './SelectField'

export const SelectElementType = ({
    handleChange,
    specificSettings,
    elementValueOptions,
    handleList,
    value,
    handleLoading,
    edit,
    ...props
}) => {
    const { refetch, loading: loadDataElement } = useReadDataElementsQuery({})
    const { refetch: refetchAttributes, loading: loadAttributes } =
        useReadAttributesQuery({})
    const { refetch: refetchProgramIndicators, loading: loadProgram } =
        useReadProgramIndicatorsQuery({})

    useEffect(() => {
        if (edit) {
            chooseInputType(specificSettings[value])
        }
    }, [])

    useEffect(() => {
        handleList([])
    }, [specificSettings.programStage, specificSettings.program])

    useEffect(() => {
        chooseInputType(specificSettings[value])
    }, [specificSettings[value]])

    useEffect(() => {
        handleLoading(loadProgram || loadDataElement || loadAttributes)
    }, [loadProgram, loadDataElement, loadAttributes])

    const chooseInputType = (type) => {
        switch (type) {
            case 'dataElements':
                return updateDataElementsList(
                    specificSettings.programStage,
                    refetch,
                    handleList
                )
            case 'programIndicators':
                return updateProgramIndicatorsList(
                    specificSettings.program,
                    refetchProgramIndicators,
                    handleList
                )
            case 'attributes':
                return updateAttributesList({
                    programId: specificSettings.program,
                    refetch: refetchAttributes,
                    updateList: handleList,
                })
        }
    }

    return (
        <SelectField
            dense
            name={value}
            inputWidth="300px"
            label={i18n.t('Choose element type')}
            onChange={handleChange}
            value={specificSettings[value] || ''}
            {...props}
        />
    )
}

SelectElementType.propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func,
    specificSettings: PropTypes.object,
    elementValueOptions: PropTypes.array,
    edit: PropTypes.bool,
}
