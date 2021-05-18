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
        {datasetAppearanceSettings.map(row => (
            <TableRowWrapper
                row={row}
                states={states}
                key={row.key}
                disable={disabled}
                dense={dense}
            >
                <CheckboxField
                    name={row.key}
                    onChange={handleChange}
                    disabled={disabled}
                    checked={states[row.key].filter}
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
        {datasetAppearanceSpecificSettings.map(row => (
            <TableRowWrapper
                dense={true}
                row={row}
                states={states}
                key={row.key}
                disable={disabled}
            >
                <CheckboxField
                    name={row.key}
                    onChange={handleChange}
                    disabled={disabled}
                    checked={states[row.key].filter}
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
