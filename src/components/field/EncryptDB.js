import React, { useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { CheckboxField } from './CheckboxField'
import DialogEncrypt from '../dialog/dialog-encrypt'

const CODE = 'encryptDB'
const LABEL = i18n.t('Encrypt device database')
const HELPTEXT = i18n.t(
    'Encrypt all data stored on device. Data can be lost if there are problems with an encrypted database. This will not affect the DHIS2 database stored on an external server.'
)

export const defaultEncryptDB = false

export const EncryptDB = ({ value, onChange, ...props }) => {
    const [openDialog, setOpenDialog] = useState(false)

    const handleCheckbox = () => {
        setOpenDialog(true)
    }

    const onCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleEncrypt = checked => {
        onChange({ ...value, [CODE]: !checked })
        setOpenDialog(false)
    }

    return (
        <>
            <CheckboxField
                name={CODE}
                label={LABEL}
                helpText={HELPTEXT}
                checked={value[CODE]}
                onChange={handleCheckbox}
                {...props}
            />

            <DialogEncrypt
                openDialog={openDialog}
                checked={value[CODE]}
                onClose={onCloseDialog}
                handleEncrypt={handleEncrypt}
            />
        </>
    )
}

EncryptDB.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
