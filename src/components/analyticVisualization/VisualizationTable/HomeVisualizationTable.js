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
import DialogDelete from '../../dialog/DialogDelete'
import DialogDeleteElement from '../../dialog/DialogDeleteElement'
import { removeSettingsFromList } from '../../../utils/utils'
import { removeElementList, updateGroupList } from './helper'
import styles from './VisualizationTable.module.css'

export const HomeVisualizationTable = ({ group, changeGroup, disable }) => {
    const [openDeleteDialog, setOpenDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    const [section, setSection] = useState([])
    const [openDeleteGroup, setDeleteGroup] = useState(false)
    const [elementName, setName] = useState()
    const [groupId, setGroupId] = useState()

    const deleteVisualization = (visualization, currentGroup, groupId) => {
        setSpecificSetting(visualization)
        setSection(currentGroup)
        setGroupId(groupId)
        setName(visualization.name)
        setOpenDialog(true)
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
        setSpecificSetting({})
        setSection([])
        setName('')
    }

    const handleDelete = () => {
        const updatedList = removeSettingsFromList(specificSetting, section)
        changeGroup(updateGroupList(group, groupId, updatedList))
        handleDialogClose()
    }

    const deleteGroup = item => {
        setName(item.name)
        setSpecificSetting(item)
        setDeleteGroup(true)
    }

    const handleCloseDeleteGroup = () => {
        setDeleteGroup(false)
        setSpecificSetting({})
        setName('')
    }

    const handleDeleteGroup = () => {
        changeGroup(removeElementList(group, specificSetting.id))
        handleCloseDeleteGroup()
    }

    return (
        <>
            <VisualizationTable
                group={group}
                deleteVisualization={deleteVisualization}
                deleteGroup={deleteGroup}
                disabled={disable}
            />
            <DialogDelete
                open={openDeleteDialog}
                onHandleDelete={handleDelete}
                onHandleClose={handleDialogClose}
                typeName={i18n.t('Visualization')}
                name={elementName}
            />
            <DialogDeleteElement
                open={openDeleteGroup}
                onHandleClose={handleCloseDeleteGroup}
                onHandleDelete={handleDeleteGroup}
                element={i18n.t('Visualization Group')}
                text={i18n.t(
                    'Are you sure you want to delete {{elementName}} visualization group?',
                    { elementName: elementName }
                )}
            />
        </>
    )
}

HomeVisualizationTable.propTypes = {
    group: PropTypes.array,
    changeGroup: PropTypes.func,
}

const VisualizationTable = ({
    group,
    deleteVisualization,
    deleteGroup,
    disabled,
}) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = index =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const expandableContent = item => (
        <VisualizationRow
            visualizationList={item.visualizations}
            deleteVisualization={deleteVisualization}
            disabled={disabled}
            groupId={item.id}
        />
    )

    const createGroupRow = () => {
        return group.map((item, i) => {
            const { name, id } = item
            const groupName = name === 'default' ? '' : name

            return (
                <DataTableRow
                    expanded={openRowIndex === i}
                    onExpandToggle={() => toggleOpenRow(i)}
                    expandableContent={expandableContent(item)}
                    key={id}
                >
                    <DataTableCell className={styles.tableTitle}>
                        {groupName}
                    </DataTableCell>
                    <DataTableCell />
                    <DataTableCell align="center">
                        <Button
                            small
                            secondary
                            onClick={() => deleteGroup(item)}
                        >
                            {i18n.t('Delete Group')}
                        </Button>
                    </DataTableCell>
                </DataTableRow>
            )
        })
    }

    return (
        <DataTable>
            <DataTableBody>{createGroupRow()}</DataTableBody>
        </DataTable>
    )
}

VisualizationTable.propTypes = {
    group: PropTypes.array,
    deleteVisualization: PropTypes.func,
    deleteGroup: PropTypes.func,
    disabled: PropTypes.bool,
}
