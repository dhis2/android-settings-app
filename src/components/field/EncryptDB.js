import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import DialogEncrypt from '../dialog/DialogEncrypt'
import { CheckboxField } from './CheckboxField'

const CODE = 'encryptDB'

export const defaultEncryptDB = false

export const EncryptDB = ({ value, onChange, ...props }) => {
    const [openDialog, setOpenDialog] = useState(false)

    const handleCheckbox = () => {
        setOpenDialog(true)
    }

    const onCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleEncrypt = (checked) => {
        onChange({ ...value, [CODE]: !checked })
        setOpenDialog(false)
    }

    return (
        <>
            <CheckboxField
                name={CODE}
                label={i18n.t('Encrypt device database')}
                helpText={i18n.t(
                    'Encrypt all data stored on device. Data can be lost if there are problems with an encrypted database. This will not affect the DHIS2 database stored on an external server.'
                )}
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
