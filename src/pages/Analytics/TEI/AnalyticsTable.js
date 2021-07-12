import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import TableActions from '../../../components/TableActions'
import DialogDelete from '../../../components/dialog/DialogDelete'
import DialogAnalyticsTEI from './DialogAnalyticsTEI'
import {
    createTEIValues,
    populateAnalyticItem,
    populateWHOItem,
    validMandatoryFields,
} from './helper'
import {
    removeSettingsFromList,
    updateSettingsList,
} from '../../../utils/utils'

const AnalyticsTable = ({ rows, disableAll, handleRows, programList }) => {
    const [specificSettings, setSpecificSettings] = useState({})
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [disableSave, setDisableSave] = useState(false)

    useEffect(() => {
        setDisableSave(validMandatoryFields(specificSettings))
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
        handleRows(updateSettingsList(updatedValue, rows))
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
                        programList={programList}
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
    programList: PropTypes.array,
    disableAll: PropTypes.bool,
}

export default AnalyticsTable
