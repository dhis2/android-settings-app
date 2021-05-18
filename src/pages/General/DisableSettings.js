import React, { useState } from 'react'
import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { ButtonField } from '../../components/sections/general/form-sections'
import DialogDisableSettings from '../../components/dialog/dialog-disable-settings'
import { NAMESPACE } from '../../constants/data-store'
import { useNavigation } from '../../utils/useNavigation'

const deleteDataStoreMutation = {
    resource: `dataStore/${NAMESPACE}`,
    type: 'delete',
}

const DisableSettings = ({ disabled }) => {
    const [mutate] = useDataMutation(deleteDataStoreMutation)
    const [openDialog, setOpenDialog] = useState(false)
    const { reloadPage, navigateTo } = useNavigation()

    const onClick = () => {
        setOpenDialog(true)
    }

    const onClose = () => {
        setOpenDialog(false)
    }

    const removeNamespaceDataStore = async () => {
        await mutate()
        onClose()
        navigateTo('/')
        reloadPage()
    }

    return (
        <>
            <ButtonField
                name="disableSettings"
                label={i18n.t('Disable all settings')}
                helpText={i18n.t(
                    'This will disable and remove all General, Program and Data set settings.'
                )}
                onOpen={onClick}
                disabled={disabled}
            />

            <DialogDisableSettings
                openDialog={openDialog}
                onClose={onClose}
                disableSettings={removeNamespaceDataStore}
            />
        </>
    )
}

DisableSettings.propTypes = {
    disabled: PropTypes.bool,
}

export default DisableSettings
