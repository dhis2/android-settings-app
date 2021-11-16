import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { AddNewSetting } from '../../../components/field'
import DialogVisualization from './DialogVisualization'
import {
    createInitialValues,
    invalidMandatoryFields,
    updateRows,
} from './helper'

const NewHomeVisualization = ({
    disable,
    visualization,
    handleVisualization,
}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [visualizationSettings, setSettings] = useState(
        createInitialValues('')
    )
    const [disableSave, setDisableSave] = useState(true)

    useEffect(() => {
        setDisableSave(invalidMandatoryFields(visualizationSettings))
    })

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
        setSettings(createInitialValues(''))
    }

    const handleSave = () => {
        const updatedVisualization = updateRows(
            visualizationSettings,
            visualization
        )
        handleVisualization(updatedVisualization)
        handleClose()
    }

    return (
        <>
            <AddNewSetting
                label={i18n.t('Add Home Visualization')}
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
                    groups={visualization}
                />
            )}
        </>
    )
}

NewHomeVisualization.propTypes = {
    disable: PropTypes.bool,
    visualization: PropTypes.array,
    handleVisualization: PropTypes.func,
    groups: PropTypes.array,
    handleGroups: PropTypes.func,
}

export default NewHomeVisualization
