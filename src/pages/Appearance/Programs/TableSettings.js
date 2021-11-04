import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { TableRowWrapper } from '../../../components/table'
import { CheckboxField } from '../../../components/field'

const programAppearanceSettings = [
    {
        key: 'assignedToMe',
        label: i18n.t('Assigned to me'),
    },
    {
        key: 'enrollmentDate',
        label: i18n.t('Enrollment Date'),
    },
    {
        key: 'enrollmentStatus',
        label: i18n.t('Enrollment status'),
    },
    {
        key: 'eventDate',
        label: i18n.t('Event Date'),
    },
    {
        key: 'eventStatus',
        label: i18n.t('Event status'),
    },
    {
        key: 'organisationUnit',
        label: i18n.t('Organisation Unit'),
    },
    {
        key: 'syncStatus',
        label: i18n.t('Sync status'),
    },
    {
        key: 'followUp',
        label: i18n.t('Follow up'),
    },
]

export const programAppearanceSpecificSettings = [
    {
        key: 'categoryCombo',
        label: i18n.t('Category Combo'),
    },
    {
        key: 'assignedToMe',
        label: i18n.t('Assigned to me'),
    },
    {
        key: 'enrollmentDate',
        label: i18n.t('Enrollment Date'),
    },
    {
        key: 'enrollmentStatus',
        label: i18n.t('Enrollment status'),
    },
    {
        key: 'eventDate',
        label: i18n.t('Event Date'),
    },
    {
        key: 'eventStatus',
        label: i18n.t('Event status'),
    },
    {
        key: 'organisationUnit',
        label: i18n.t('Organisation Unit'),
    },
    {
        key: 'syncStatus',
        label: i18n.t('Sync status'),
    },
    {
        key: 'followUp',
        label: i18n.t('Follow up'),
    },
]

export const ProgramGlobalSettings = ({
    states,
    handleChange,
    disabled,
    dense,
}) => (
    <>
        {programAppearanceSettings.map(({ key, label }) => (
            <TableRowWrapper
                label={label}
                states={states}
                key={key}
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

ProgramGlobalSettings.propTypes = {
    states: PropTypes.object,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
    dense: PropTypes.bool,
}

export const ProgramCategoryComboSettings = ({
    states,
    handleChange,
    disabled,
}) => (
    <>
        {programAppearanceSpecificSettings.map(({ key, label }) => (
            <TableRowWrapper
                label={label}
                states={states}
                key={key}
                dense={true}
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
                    dense={true}
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
