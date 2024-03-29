import PropTypes from 'prop-types'
import React, { useState } from 'react'
import DialogManualAlert from '../dialog/DialogManualAlert'
import { SelectField } from './SelectField'

export const MANUAL = 'manual'

export const SyncSelect = ({
    options,
    selected,
    onChange,
    name,
    settings,
    ...props
}) => {
    const [openDialog, setOpenDialog] = useState(false)

    const onChangeSelect = (e) => {
        e.selected === MANUAL
            ? setOpenDialog(true)
            : onChange({ ...settings, [name]: e.selected })
    }

    const handleCloseDialog = () => {
        onChange({ ...settings, [name]: selected })
        setOpenDialog(false)
    }

    const handleChooseManual = () => {
        onChange({ ...settings, [name]: MANUAL })
        setOpenDialog(false)
    }

    return (
        <>
            <SelectField
                name={name}
                selected={selected}
                options={options}
                onChange={onChangeSelect}
                {...props}
            />

            <DialogManualAlert
                openDialog={openDialog}
                chooseOption={handleChooseManual}
                onClose={handleCloseDialog}
                manualOptionType={name}
            />
        </>
    )
}

SyncSelect.propTypes = {
    name: PropTypes.string,
    selected: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    settings: PropTypes.object,
}
