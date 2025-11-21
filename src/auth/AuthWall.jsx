import { useAlert, useConfig, useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import isNil from 'lodash/isNil'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import DialogFirstLaunch from '../components/dialog/DialogFirstLaunch.jsx'
import { deletePrevDataStoreMutation, useCreateFirstSetup } from '../modules'
import {
    updateInfoMutation,
    useAndroidSettingsVersion,
} from './useAndroidSettingsVersion'
import { useIsAuthorized } from './useIsAuthorized'

const AuthWall = ({ children }) => {
    const { hasAuthority, hasNamespace, hasOutDateNamespace } =
        useIsAuthorized()
    const { isInfoUpdated } = useAndroidSettingsVersion()
    const { apiVersion } = useConfig()
    const [hasDatastoreAccess, setDatastoreAccess] = useState(hasNamespace)
    const [mutate] = useDataMutation(deletePrevDataStoreMutation)
    const [mutateUpdateInfo] = useDataMutation(updateInfoMutation)
    const { createSetup } = useCreateFirstSetup()
    const { show } = useAlert(
        ({ success }) =>
            success
                ? i18n.t(
                      'The initial configuration of the app has been completed and it is now ready to use.'
                  )
                : i18n.t(
                      'The initial configuration of the app encountered an error and it cannot be used at this time.'
                  ),
        ({ success }) => (success ? { success: true } : { critical: true })
    )

    useEffect(() => {
        if (!isNil(isInfoUpdated) && !isInfoUpdated) {
            updateInfoVersion().catch((e) => console.error(e))
        }
    }, [isInfoUpdated])

    const updateInfoVersion = async () => {
        await mutateUpdateInfo()
    }

    const handleSave = async () => {
        if (hasOutDateNamespace) {
            await mutate()
        }

        createSetup(apiVersion)
            .then(() => {
                setDatastoreAccess(true)
                show({ success: true })
            })
            .catch((e) => {
                console.error(e)
                setDatastoreAccess(false)
                show({ success: false })
            })
    }

    if (!hasDatastoreAccess) {
        return (
            <>
                <DialogFirstLaunch
                    handleSave={handleSave}
                    disable={!hasAuthority}
                    isOutOfDate={hasOutDateNamespace}
                />
            </>
        )
    }

    return children
}

AuthWall.propTypes = {
    children: PropTypes.node.isRequired,
}

export { AuthWall }
