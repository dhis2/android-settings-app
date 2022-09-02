import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import DialogDelete from '../../dialog/DialogDelete'
import DialogDeleteElement from '../../dialog/DialogDeleteElement'
import { VisualizationTable } from './VisualizationTable'
import { removeElement, updateGroup, updateVisualizations } from './helper'
import { removeSettingsFromList } from '../../../utils/utils'
import EditVisualization from "../EditVisualization"

export const DatasetTable = ({ rows, changeRows, disabled }) => {
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
                elementType: 'dataset',
            })
        )
        handleCloseEdit()
    }

    const deleteVisualization = (row, group) => {
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
        const { dataset, group: datasetGroup } = specificSetting
        const updatedGroups = updateGroup(
            rows[dataset].groups,
            datasetGroup.id,
            updatedList
        )

        changeRows({
            ...rows,
            [dataset]: {
                ...rows[dataset],
                groups: updatedGroups,
            },
        })
        handleDialogClose()
    }

    const handleDeleteGroup = () => {
        const visualizations = Object.assign({}, rows)
        const currentDatasetGroups = visualizations[group].groups
        const updatedGroupList = removeElement(
            currentDatasetGroups,
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

    const deleteGroup = (item, datasetId) => {
        const name = rows[datasetId].groups[item][0].group.name
        setName(name)
        setSpecificSetting(item)
        setGroup(datasetId)
        setDeleteGroup(true)
    }

    return (
        <>
            <VisualizationTable
                element="dataset"
                rows={rows}
                editVisualization={editVisualization}
                deleteVisualization={deleteVisualization}
                deleteGroup={deleteGroup}
                disabled={disabled}
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
            {
                openEditDialog &&
                <EditVisualization
                    open={openEditDialog}
                    settings={specificSetting}
                    handleChange={setSpecificSetting}
                    groups={group}
                    currentGroup={groupId}
                    handleClose={handleCloseEdit}
                    handleEdit={handleEdit}
                    type="dataset"
                />
            }
        </>
    )
}

DatasetTable.propTypes = {
    disabled: PropTypes.bool,
    rows: PropTypes.object,
    changeRows: PropTypes.func,
}
