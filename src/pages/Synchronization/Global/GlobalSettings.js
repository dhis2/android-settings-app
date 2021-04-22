import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { useDataQuery } from '@dhis2/app-runtime'
import { DataSync, MetadataSync } from '../../../components/field'
import { useGetSyncDataStore } from '../SyncDatastoreQuery'
import NoticeAlert from '../../../components/notice-alert'

const authorityQuery = {
    authority: {
        resource: 'me/authorities/ALL',
    },
}

const GlobalSettings = () => {
    const { load, syncGlobal, syncSettings } = useGetSyncDataStore()
    const { data } = useDataQuery(authorityQuery)
    const [settings, setSettings] = useState()
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        data && setDisable(!data.authority)
    }, [data])

    useEffect(() => {
        if (syncSettings) {
            setSettings(syncGlobal)
        }
    }, [syncSettings])

    return (
        <>
            {settings && !load && (
                <>
                    <NoticeAlert
                        title={i18n.t('Manual options')}
                        notice={i18n.t(
                            'Manual options for data and metadata sync are only available from android app version 2.3.0 onwards.'
                        )}
                    />

                    <MetadataSync
                        value={settings}
                        onChange={setSettings}
                        disabled={disable}
                    />

                    <DataSync
                        value={settings}
                        onChange={setSettings}
                        disabled={disable}
                    />
                </>
            )}
        </>
    )
}

export default GlobalSettings
