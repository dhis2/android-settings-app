import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import DialogBypass from '../dialog/DialogBypass'
import { CheckboxField } from './CheckboxField'

const CODE = 'bypassDHIS2VersionCheck'

export const defaultBypassDHIS2Version = false

export const BypassDHIS2Version = ({ value, onChange, ...props }) => {
    const [open, setOpen] = useState(false)

    const handleCheckbox = () => {
        setOpen(true)
    }

    const onCloseDialog = () => {
        setOpen(false)
    }

    const handleBypassChange = (checked) => {
        onChange({ ...value, [CODE]: !checked })
        onCloseDialog()
    }

    return (
        <>
            <CheckboxField
                name={CODE}
                label={i18n.t('Skip DHIS2 version validation')}
                helpText={i18n.t(
                    'Bypass the validation process for DHIS2 version compatibility'
                )}
                checked={value[CODE]}
                onChange={handleCheckbox}
                {...props}
            />

            <DialogBypass
                openDialog={open}
                handleBypass={handleBypassChange}
                onClose={onCloseDialog}
                checked={value[CODE]}
            />
        </>
    )
}

BypassDHIS2Version.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
