import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import TableActions from '../../../components/TableActions'
import DialogDelete from '../../../components/dialog/DialogDelete'
import DialogSpecificSetting from './DialogSpecificSetting'
import { isProgramWithRegistration } from './helper'
import { parseValueByType } from './parseValueBySettingType'
import {
    removeSettingsFromList,
    updateSettingsList,
} from '../../../utils/utils'

const SpecificTableAction = ({ rows, changeRows, disableAll, programList }) => {
    const [openDeleteDialog, setOpenDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [programWithRegistration, setProgramType] = useState(true)

    const tableActions = {
        edit: (...args) => {
            setSpecificSetting(args[0])
            setProgramType(isProgramWithRegistration(programList, args[0].id))
            setOpenEditDialog(true)
        },
        delete: (...args) => {
            setOpenDialog(true)
            setSpecificSetting(args[0])
        },
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    const handleDelete = () => {
        const updatedList = removeSettingsFromList(specificSetting, rows)
        changeRows(updatedList)
        handleDialogClose()
    }

    const handleEditClose = () => {
        setOpenEditDialog(false)
    }

    const handleChange = (e, key) => {
        const name = typeof key === 'string' ? key : e.name
        const value = typeof key === 'string' ? e.selected : e.value

        setSpecificSetting({
            ...specificSetting,
            [name]: parseValueByType(name, value),
        })
    }

    const handleSave = () => {
        const updatedList = updateSettingsList(specificSetting, rows)
        changeRows(updatedList)
        handleEditClose()
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
                        onHandleClose={handleDialogClose}
                        onHandleDelete={handleDelete}
                        typeName={i18n.t('program')}
                        name={specificSetting.name}
                    />

                    <DialogSpecificSetting
                        open={openEditDialog}
                        handleClose={handleEditClose}
                        programTitle={specificSetting.name}
                        handleChange={handleChange}
                        specificSetting={specificSetting}
                        handleSubmitDialog={handleSave}
                        programWithRegistration={programWithRegistration}
                    />
                </>
            )}
        </>
    )
}

SpecificTableAction.propTypes = {
    rows: PropTypes.array,
    changeRows: PropTypes.func,
    programList: PropTypes.array,
    disableAll: PropTypes.bool,
}

export default SpecificTableAction
