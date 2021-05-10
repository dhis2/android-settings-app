import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import TableActions from '../../components/table-actions'
import DialogDelete from '../../components/dialog/dialog-delete'
import {
    createTEIValues,
    populateAnalyticItem,
    populateWHOItem,
    removeSettingsFromList,
    updateList,
    WHO_NUTRITION,
} from './helper'
import { validateObjectByProperty } from '../../utils/validators/validateObjectByProperty'
import DialogAnalyticsTEI from './DialogAnalyticsTEI'

const AnalyticsTable = ({ rows, disableAll, handleRows }) => {
    const [specificSettings, setSpecificSettings] = useState({})
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [disableSave, setDisableSave] = useState(false)

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

    const tableActions = {
        edit: (...arg) => {
            arg[0].data
                ? setSpecificSettings(populateAnalyticItem(arg[0]))
                : setSpecificSettings(populateWHOItem(arg[0]))
            setOpenEditDialog(true)
        },
        delete: (...arg) => {
            setOpenDeleteDialog(true)
            setSpecificSettings(arg[0])
        },
    }

    const handleDelete = () => {
        handleRows(removeSettingsFromList(specificSettings, rows))
        setOpenDeleteDialog(false)
    }

    const handleDialogClose = () => {
        setOpenDeleteDialog(false)
    }

    const handleCloseEdit = () => {
        setOpenEditDialog(false)
    }

    const handleSave = () => {
        const updatedValue = createTEIValues(
            specificSettings,
            specificSettings.uid
        )
        handleRows(updateList(updatedValue, rows))
        handleCloseEdit()
    }

    return (
        <>
            {rows && (
                <>
                    <TableActions
                        rows={rows}
                        menuActions={tableActions}
                        states={{ disableAll }}
                    />

                    <DialogDelete
                        open={openDeleteDialog}
                        onHandleClose={handleDialogClose}
                        onHandleDelete={handleDelete}
                        typeName={i18n.t('Analytics')}
                        name={specificSettings.name}
                    />

                    <DialogAnalyticsTEI
                        open={openEditDialog}
                        handleClose={handleCloseEdit}
                        handleChange={setSpecificSettings}
                        specificSettings={specificSettings}
                        handleSave={handleSave}
                        edit={true}
                        disableSave={disableSave}
                    />
                </>
            )}
        </>
    )
}

AnalyticsTable.propTypes = {
    rows: PropTypes.array,
    handleRows: PropTypes.func,
    disableAll: PropTypes.bool,
}

export default AnalyticsTable
