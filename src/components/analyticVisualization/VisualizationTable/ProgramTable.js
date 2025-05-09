import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { removeSettingsFromList } from '../../../utils/utils'
import DialogDelete from '../../dialog/DialogDelete'
import DialogDeleteElement from '../../dialog/DialogDeleteElement'
import { EditVisualization } from '../EditVisualization'
import {
    removeElement,
    reorderElement,
    updateGroup,
    updateVisualizations,
} from './helper'
import { VisualizationTable } from './VisualizationTable'

export const ProgramTable = ({ rows, changeRows, disabled }) => {
    const [openDeleteDialog, setOpenDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    const [group, setGroup] = useState([])
    const [openDeleteGroup, setDeleteGroup] = useState(false)
    const [elementName, setName] = useState()
    const [groupId, setGroupId] = useState('')
    const [openEditDialog, setOpenEditDialog] = useState(false)

    const editVisualization = (visualization, visualizationGroup) => {
        setOpenEditDialog(true)
        setSpecificSetting(visualization)
        setGroupId(visualization.group.id)
        setGroup(visualizationGroup)
    }

    const handleCloseEdit = () => {
        setOpenEditDialog(false)
        setSpecificSetting({})
        setGroupId('')
        setGroup([])
    }

    const handleEdit = () => {
        changeRows(
            updateVisualizations(group, rows, {
                currentElement: specificSetting,
                elementType: 'program',
            })
        )
        handleCloseEdit()
    }

    const deleteRow = (row, group) => {
        setSpecificSetting(row)
        setGroup(group)
        setName(row.name || row.visualizationName)
        setOpenDialog(true)
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
        setSpecificSetting({})
        setGroup([])
        setName('')
    }

    const handleDelete = () => {
        const updatedList = removeSettingsFromList(specificSetting, group)
        const { program, group: programGroup } = specificSetting
        const updatedGroups = updateGroup(
            rows[program].groups,
            programGroup.id,
            updatedList
        )

        changeRows({
            ...rows,
            [program]: {
                ...rows[program],
                groups: updatedGroups,
            },
        })
        handleDialogClose()
    }

    const handleDeleteGroup = () => {
        const visualizations = Object.assign({}, rows)
        const currentProgramGroups = visualizations[group].groups
        const updatedGroupList = removeElement(
            currentProgramGroups,
            specificSetting
        )

        changeRows({
            ...rows,
            [group]: {
                ...rows[group],
                groups: updatedGroupList,
            },
        })
        handleCloseDeleteGroup()
    }

    const handleCloseDeleteGroup = () => {
        setDeleteGroup(false)
        setSpecificSetting({})
        setGroup([])
        setName('')
    }

    const deleteGroup = (item, programId) => {
        const name = rows[programId].groups[item][0].group.name
        setName(name)
        setSpecificSetting(item)
        setGroup(programId)
        setDeleteGroup(true)
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

        const updatedGroups = updateGroup(
            rows[visualization?.program].groups,
            visualization?.group.id,
            updatedList
        )

        changeRows({
            ...rows,
            [visualization?.program]: {
                ...rows[visualization?.program],
                groups: updatedGroups,
            },
        })
    }

    return (
        <>
            <VisualizationTable
                element="program"
                rows={rows}
                editVisualization={editVisualization}
                deleteVisualization={deleteRow}
                orderVisualization={orderVisualization}
                deleteGroup={deleteGroup}
                disabled={disabled}
            />
            <DialogDelete
                open={openDeleteDialog}
                name={elementName}
                onHandleDelete={handleDelete}
                onHandleClose={handleDialogClose}
                typeName={i18n.t('Visualization')}
            />
            <DialogDeleteElement
                open={openDeleteGroup}
                onHandleClose={handleCloseDeleteGroup}
                onHandleDelete={handleDeleteGroup}
                text={i18n.t(
                    'Are you sure you want to delete {{elementName}} visualization group?',
                    { elementName: elementName }
                )}
                element={i18n.t('Visualization Group')}
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
                    type="program"
                />
            )}
        </>
    )
}

ProgramTable.propTypes = {
    disabled: PropTypes.bool,
    rows: PropTypes.object,
    changeRows: PropTypes.func,
}
