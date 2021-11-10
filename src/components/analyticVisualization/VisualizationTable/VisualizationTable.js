import React, { useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import {
    DataTable,
    DataTableBody,
    DataTableRow,
    DataTableCell,
} from '@dhis2/ui'
import { GroupVisualizationRow } from './GroupVisualizationRow'
import styles from './VisualizationTable.module.css'

export const VisualizationTable = ({
    rows,
    deleteVisualization,
    deleteGroup,
    element,
    disabled,
}) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = index =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const expandableContent = item => (
        <GroupVisualizationRow
            group={item}
            deleteVisualization={deleteVisualization}
            deleteGroup={deleteGroup}
            element={element}
            disabled={disabled}
        />
    )

    return (
        <DataTable>
            <DataTableBody>
                {Object.keys(rows).map((item, i) => (
                    <DataTableRow
                        expanded={openRowIndex === i}
                        onExpandToggle={() => toggleOpenRow(i)}
                        expandableContent={expandableContent(rows[item])}
                        key={item}
                    >
                        <DataTableCell className={styles.tableTitle}>
                            {rows[item][`${element}Name`]}
                        </DataTableCell>
                    </DataTableRow>
                ))}
            </DataTableBody>
        </DataTable>
    )
}

VisualizationTable.propTypes = {
    rows: PropTypes.object,
    element: PropTypes.string,
    deleteVisualization: PropTypes.func,
    deleteGroup: PropTypes.func,
    disabled: PropTypes.bool,
}
