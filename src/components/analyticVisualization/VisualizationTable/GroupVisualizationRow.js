import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import {
    Button,
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableRow,
} from '@dhis2/ui'
import { VisualizationRow } from './VisualizationRow'
import styles from './VisualizationTable.module.css'

export const GroupVisualizationRow = ({
    group,
    deleteVisualization,
    deleteGroup,
    element,
    disabled,
}) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = index =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const expandableContent = item => (
        <VisualizationRow
            visualizationList={item}
            deleteVisualization={deleteVisualization}
            disabled={disabled}
        />
    )

    const createGroupRow = () => {
        return Object.entries(group.groups).map(([item, groupRow], i) => {
            const groupName =
                groupRow[0].group.name === 'default'
                    ? ''
                    : groupRow[0].group.name
            const elementId = groupRow[0][element]

            return (
                <DataTableRow
                    expanded={openRowIndex === i}
                    onExpandToggle={() => toggleOpenRow(i)}
                    expandableContent={expandableContent(groupRow)}
                    key={i}
                >
                    <DataTableCell className={styles.tableSubtitle}>
                        {groupName}
                    </DataTableCell>
                    <DataTableCell />
                    <DataTableCell align="center">
                        <Button
                            small
                            secondary
                            onClick={() => deleteGroup(item, elementId)}
                            disabled={disabled}
                        >
                            {i18n.t('Delete Group')}
                        </Button>
                    </DataTableCell>
                </DataTableRow>
            )
        })
    }

    return (
        <div className={styles.rowPadding}>
            <DataTable className={styles.table}>
                <DataTableBody>{createGroupRow()}</DataTableBody>
            </DataTable>
        </div>
    )
}

GroupVisualizationRow.propTypes = {
    group: PropTypes.object,
    deleteGroup: PropTypes.func,
    deleteVisualization: PropTypes.func,
    disabled: PropTypes.bool,
    element: PropTypes.string,
}
