import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { AddNewSetting } from '../../components/field'
import DialogAnalyticsTEI from './DialogAnalyticsTEI'
import {
    createInitialValues,
    createTEIValues,
    updateList,
    WHO_NUTRITION,
} from './helper'
import { useReadIdQuery } from './AnalyticsQueries'
import { validateObjectByProperty } from '../../utils/validators/validateObjectByProperty'

const NewAnalyticSettings = ({ disable, handleSettings, settings }) => {
    const { refetch: refetchId, data: id } = useReadIdQuery()
    const [openDialog, setOpenDialog] = useState(false)
    const [specificSettings, setSpecificSettings] = useState(
        createInitialValues('')
    )
    const [disableSave, setDisableSave] = useState(true)

    useEffect(() => {
        if (specificSettings.type === WHO_NUTRITION) {
            validateObjectByProperty(
                [
                    'program',
                    'programStage',
                    'name',
                    'type',
                    'chartType',
                    'attribute',
                    'male',
                    'female',
                    'elementX',
                    'elementValueX',
                    'elementY',
                    'elementValueY',
                ],
                specificSettings
            )
                ? setDisableSave(false)
                : setDisableSave(true)
        } else {
            validateObjectByProperty(
                [
                    'program',
                    'programStage',
                    'name',
                    'type',
                    'period',
                    'element',
                    'elementValue',
                ],
                specificSettings
            )
                ? setDisableSave(false)
                : setDisableSave(true)
        }
    }, [specificSettings])

    const handleOpenDialog = () => {
        setOpenDialog(true)
        refetchId()
    }

    const handleClose = () => {
        setOpenDialog(false)
        setSpecificSettings(createInitialValues(''))
        setDisableSave(true)
    }

    const handleSave = () => {
        const updatedValue = createTEIValues(
            specificSettings,
            id?.system?.codes[0]
        )
        handleSettings(updateList(updatedValue, settings))
        handleClose()
    }

    return (
        <>
            <AddNewSetting
                label={i18n.t('Add TEI Analytics')}
                onClick={handleOpenDialog}
                disable={disable}
            />

            {openDialog && (
                <DialogAnalyticsTEI
                    open={openDialog}
                    handleSave={handleSave}
                    handleClose={handleClose}
                    handleChange={setSpecificSettings}
                    specificSettings={specificSettings}
                    disableSave={disableSave}
                />
            )}
        </>
    )
}

NewAnalyticSettings.propTypes = {
    settings: PropTypes.array,
    disable: PropTypes.bool,
    handleSettings: PropTypes.func,
}

export default NewAnalyticSettings
