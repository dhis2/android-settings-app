import i18n from '@dhis2/d2-i18n'
import {
    Button,
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableRow,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { removeSettingsFromList } from '../../../utils/utils'
import DialogDelete from '../../dialog/DialogDelete.jsx'
import DialogDeleteElement from '../../dialog/DialogDeleteElement.jsx'
import { EditVisualization } from '../EditVisualization.jsx'
import {
    removeElementList,
    reorderElement,
    updateGroupList,
    updateVisualizationName,
} from './helper'
import { VisualizationRow } from './VisualizationRow.jsx'
import styles from './VisualizationTable.module.css'

export const HomeVisualizationTable = ({ group, changeGroup, disable }) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    const [section, setSection] = useState([])
    const [openDeleteGroup, setOpenDeleteGroup] = useState(false)
    const [elementName, setElementName] = useState('')
    const [groupId, setGroupId] = useState('')
    const [openEditDialog, setOpenEditDialog] = useState(false)

    const deleteVisualization = (visualization, currentGroup, groupId) => {
        setSpecificSetting(visualization)
        setSection(currentGroup)
        setGroupId(groupId)
        setElementName(visualization.name || visualization.visualizationName)
        setOpenDeleteDialog(true)
    }

    const editVisualization = (visualization, visualizationList, groupId) => {
        setOpenEditDialog(true)
        setSpecificSetting(visualization)
        setGroupId(groupId)
    }

    const handleCloseEdit = () => {
        setOpenEditDialog(false)
        setSpecificSetting({})
        setGroupId('')
    }

    const handleEdit = () => {
        changeGroup(updateVisualizationName(group, groupId, specificSetting))
        handleCloseEdit()
    }

    const handleDialogClose = () => {
        setOpenDeleteDialog(false)
        setSpecificSetting({})
        setSection([])
        setElementName('')
    }

    const handleDelete = () => {
        const updatedList = removeSettingsFromList(specificSetting, section)
        changeGroup(updateGroupList(group, groupId, updatedList))
        handleDialogClose()
    }

    const deleteGroup = (item) => {
        setElementName(item.name)
        setSpecificSetting(item)
        setOpenDeleteGroup(true)
    }

    const handleCloseDeleteGroup = () => {
        setOpenDeleteGroup(false)
        setSpecificSetting({})
        setElementName('')
    }

    const handleDeleteGroup = () => {
        changeGroup(removeElementList(group, specificSetting.id))
        handleCloseDeleteGroup()
    }

    const orderVisualization = ({
        visualization,
        visualizationList,
        groupId,
        direction,
    }) => {
        const updatedList = reorderElement(
            visualization,
            visualizationList,
            direction
        )
        changeGroup(updateGroupList(group, groupId, updatedList))
    }

    return (
        <>
            <VisualizationTable
                group={group}
                deleteVisualization={deleteVisualization}
                editVisualization={editVisualization}
                deleteGroup={deleteGroup}
                orderVisualization={orderVisualization}
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
            {openEditDialog && (
                <EditVisualization
                    open={openEditDialog}
                    settings={specificSetting}
                    handleChange={setSpecificSetting}
                    groups={group}
                    currentGroup={groupId}
                    handleClose={handleCloseEdit}
                    handleEdit={handleEdit}
                    type="home"
                />
            )}
        </>
    )
}

HomeVisualizationTable.propTypes = {
    group: PropTypes.array,
    changeGroup: PropTypes.func,
    disable: PropTypes.bool,
}

const VisualizationTable = ({
    group,
    deleteVisualization,
    editVisualization,
    deleteGroup,
    disabled,
    orderVisualization,
}) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = (index) =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const expandableContent = (item) => (
        <VisualizationRow
            visualizationList={item.visualizations}
            deleteVisualization={deleteVisualization}
            editVisualization={editVisualization}
            orderVisualization={orderVisualization}
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
    editVisualization: PropTypes.func,
    orderVisualization: PropTypes.func,
}
