import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { TableRowWrapper } from '../../../components/table'
import { CheckboxField } from '../../../components/field'
import {
    programAppearanceSettings,
    programAppearanceSpecificSettings,
} from '../../../constants/program-appearance'

export const ProgramGlobalSettings = ({ states, handleChange, disabled }) => (
    <>
        {programAppearanceSettings.map(row => (
            <TableRowWrapper row={row} states={states} key={row.key}>
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

ProgramGlobalSettings.propTypes = {
    states: PropTypes.object,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
}

export const ProgramCategoryComboSettings = ({
    states,
    handleChange,
    disabled,
}) => (
    <>
        {programAppearanceSpecificSettings.map(row => (
            <TableRowWrapper row={row} states={states} key={row.key}>
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

ProgramCategoryComboSettings.propTypes = {
    states: PropTypes.object,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
}

export const TableSettings = ({ type, states, handleChange }) => {
    switch (type) {
        case 'Program':
            return (
                <ProgramGlobalSettings
                    states={states}
                    handleChange={handleChange}
                />
            )
        case 'ProgramCategory':
            return (
                <ProgramCategoryComboSettings
                    states={states}
                    handleChange={handleChange}
                />
            )
    }
}

TableSettings.propTypes = {
    type: PropTypes.string,
    states: PropTypes.object,
    handleChange: PropTypes.func,
}
