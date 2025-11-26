import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { AddNewSetting } from '../../../components/field'
import DialogVisualization from './DialogVisualization.jsx'
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
    const [visualizationSettings, setVisualizationSettings] = useState(
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
        setVisualizationSettings(createInitialValues(''))
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
                    handleChange={setVisualizationSettings}
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
}

export default NewHomeVisualization
