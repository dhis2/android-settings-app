import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { AddNewSetting } from '../../../components/field'
import DialogVisualization from './DialogVisualization'
import {
    createInitialValues,
    createVisualizationValues,
    getGroupList,
    invalidMandatoryFields,
    updateRows,
} from './helper'

const NewProgramVisualization = ({
    disable,
    visualization,
    handleVisualization,
    groups,
    handleGroups,
}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [visualizationSettings, setSettings] = useState(
        createInitialValues('')
    )
    const [disableSave, setDisableSave] = useState(true)

    useEffect(() => {
        setDisableSave(invalidMandatoryFields(visualizationSettings))
    }, [visualizationSettings])

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
        setSettings(createInitialValues(''))
    }

    const handleSave = () => {
        const currentVisualization = createVisualizationValues(
            visualizationSettings
        )

        const updatedVisualizationList = updateRows(
            currentVisualization,
            visualization
        )

        handleVisualization(updatedVisualizationList)
        handleGroups(getGroupList(updatedVisualizationList))
        handleClose()
    }

    return (
        <>
            <AddNewSetting
                label={i18n.t('Add Program Visualization')}
                onClick={handleOpenDialog}
                disable={disable}
            />

            {openDialog && (
                <DialogVisualization
                    open={openDialog}
                    settings={visualizationSettings}
                    handleChange={setSettings}
                    handleSave={handleSave}
                    handleClose={handleClose}
                    disableSave={disableSave}
                    groups={groups}
                />
            )}
        </>
    )
}

NewProgramVisualization.propTypes = {
    disable: PropTypes.bool,
    visualization: PropTypes.object,
    handleVisualization: PropTypes.func,
    groups: PropTypes.object,
    handleGroups: PropTypes.func,
}

export default NewProgramVisualization
