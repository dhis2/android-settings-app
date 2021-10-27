import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { TableRowWrapper } from '../../../components/table'
import { CheckboxField } from '../../../components/field'
import {
    datasetAppearanceSettings,
    datasetAppearanceSpecificSettings,
} from '../../../constants/dataset-appearance'

export const DatasetGlobalSettings = ({
    states,
    handleChange,
    disabled,
    dense,
}) => (
    <>
        {datasetAppearanceSettings.map(({ key, label }) => (
            <TableRowWrapper
                label={label}
                states={states}
                key={key}
                disable={disabled}
                dense={dense}
            >
                <CheckboxField
                    name={key}
                    onChange={handleChange}
                    disabled={disabled}
                    checked={states[key].filter}
                />
            </TableRowWrapper>
        ))}
    </>
)

DatasetGlobalSettings.propTypes = {
    states: PropTypes.object,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
}

export const DatasetCategoryComboSettings = ({
    states,
    handleChange,
    disabled,
}) => (
    <>
        {datasetAppearanceSpecificSettings.map(({ key, label }) => (
            <TableRowWrapper
                dense={true}
                label={label}
                states={states}
                key={key}
                disable={disabled}
            >
                <CheckboxField
                    name={key}
                    onChange={handleChange}
                    disabled={disabled}
                    checked={states[key].filter}
                />
            </TableRowWrapper>
        ))}
    </>
)

DatasetCategoryComboSettings.propTypes = {
    states: PropTypes.object,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
}

export const TableSettings = ({ type, states, handleChange, disabled }) => {
    switch (type) {
        case 'Dataset':
            return (
                <DatasetGlobalSettings
                    states={states}
                    handleChange={handleChange}
                    disabled={disabled}
                    dense={true}
                />
            )
        case 'DatasetCategory':
            return (
                <DatasetCategoryComboSettings
                    handleChange={handleChange}
                    states={states}
                    disabled={disabled}
                />
            )
    }
}

TableSettings.propTypes = {
    type: PropTypes.string,
    states: PropTypes.object,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
}
