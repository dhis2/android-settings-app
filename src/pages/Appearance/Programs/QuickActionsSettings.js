import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { CheckboxField } from '../../../components/field'
import { TableRowWrapper } from '../../../components/table'

const quickActionsList = [
    { key: 'MARK_FOLLOW_UP', label: i18n.t('Mark for Follow Up') },
    { key: 'TRANSFER', label: i18n.t('Transfer') },
    { key: 'COMPLETE_ENROLLMENT', label: i18n.t('Complete Enrollment') },
    { key: 'DEACTIVATE', label: i18n.t('Deactivate') },
    { key: 'MORE_ENROLLMENTS', label: i18n.t('More Enrollments') },
]

export const QuickActionsSettings = ({ handleChange, settings }) => {
    const [selectedActions, setSelectedActions] = useState(
        settings?.quickActions?.map((action) => action.actionId) || []
    )

    const handleCheckboxChange = (event) => {
        const { name, checked } = event

        setSelectedActions((prevSelected) => {
            const updatedActions = checked
                ? [...prevSelected, name]
                : prevSelected.filter((action) => action !== name)

            handleChange({
                name: 'quickActions',
                value: updatedActions.map((actionId) => ({ actionId })),
            })

            return updatedActions
        })
    }

    return (
        <>
            {quickActionsList.map(({ key, label }) => (
                <TableRowWrapper key={key} label={label}>
                    <CheckboxField
                        name={key}
                        onChange={handleCheckboxChange}
                        checked={selectedActions.includes(key)}
                    />
                </TableRowWrapper>
            ))}
        </>
    )
}

QuickActionsSettings.propTypes = {
    handleChange: PropTypes.func.isRequired,
    settings: PropTypes.shape({
        quickActions: PropTypes.arrayOf(
            PropTypes.shape({
                actionId: PropTypes.string.isRequired,
            })
        ),
    }),
}
