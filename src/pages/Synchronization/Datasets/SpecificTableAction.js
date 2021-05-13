import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { parseValueBySettingType } from '../../../modules/dataset/parseValueBySettingType'
import { getPeriodType, updateSettingsList } from './helper'
import { removeSettingsFromList } from '../../Analytics/helper'
import TableActions from '../../../components/table-actions'
import DialogDelete from '../../../components/dialog/dialog-delete'
import DialogSpecificSettings from './DialogSpecificSettings'

const SpecificTableAction = ({ rows, changeRows, datasetList, disableAll }) => {
    const [openDeleteDialog, setOpenDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [periodType, setPeriodType] = useState()

    const tableActions = {
        edit: (...args) => {
            setSpecificSetting(args[0])
            setPeriodType(getPeriodType(args[0].id, datasetList).name)
            setOpenEditDialog(true)
        },
        delete: (...args) => {
            setOpenDialog(true)
            setSpecificSetting(args[0])
        },
    }

    const handleCloseDelete = () => {
        setOpenDialog(false)
    }

    const handleChange = e => {
        setSpecificSetting({
            ...specificSetting,
            [e.name]: parseValueBySettingType(e.name, e.value),
        })
    }

    const handleSaveEdit = () => {
        const updatedList = updateSettingsList(specificSetting, rows)
        changeRows(updatedList)
        handleCloseEdit()
    }

    const handleCloseEdit = () => {
        setOpenEditDialog(false)
    }

    const handleDelete = () => {
        const updatedList = removeSettingsFromList(specificSetting, rows)
        changeRows(updatedList)
        setOpenDialog(false)
    }

    return (
        <>
            {rows.length > 0 && (
                <>
                    <TableActions
                        states={{ disableAll }}
                        rows={rows}
                        menuActions={tableActions}
                    />

                    <DialogDelete
                        open={openDeleteDialog}
                        onHandleClose={handleCloseDelete}
                        onHandleDelete={handleDelete}
                        typeName={i18n.t('data set')}
                        name={specificSetting.name}
                    />

                    <DialogSpecificSettings
                        open={openEditDialog}
                        handleClose={handleCloseEdit}
                        periodType={periodType}
                        datasetTitle={specificSetting.name}
                        handleChange={handleChange}
                        specificSetting={specificSetting}
                        handleSubmitDialog={handleSaveEdit}
                    />
                </>
            )}
        </>
    )
}

SpecificTableAction.propTypes = {
    rows: PropTypes.array,
    changeRows: PropTypes.func,
    datasetList: PropTypes.array,
    disableAll: PropTypes.bool,
}

export default SpecificTableAction
