import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { AddNewSetting } from '../../../components/field'
import DialogAnalyticsTEI from './DialogAnalyticsTEI'
import {
    createInitialValues,
    createTEIValues,
    validMandatoryFields,
} from './helper'
import { useReadIdQuery } from './AnalyticsQueries'
import { updateSettingsList } from '../../../utils/utils'

const NewAnalyticSettings = ({
    disable,
    handleSettings,
    settings,
    programList,
}) => {
    const { refetch: refetchId, data: id } = useReadIdQuery()
    const [openDialog, setOpenDialog] = useState(false)
    const [specificSettings, setSpecificSettings] = useState(
        createInitialValues('')
    )
    const [disableSave, setDisableSave] = useState(true)

    useEffect(() => {
        setDisableSave(validMandatoryFields(specificSettings))
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
            id.system.codes[0]
        )
        handleSettings(updateSettingsList(updatedValue, settings))
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
                    programList={programList}
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
    programList: PropTypes.array,
}

export default NewAnalyticSettings
