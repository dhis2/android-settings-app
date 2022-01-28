import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import isEqual from 'lodash/isEqual'
import Page from '../../../components/page/Page'
import {
    DataSync,
    MetadataSync,
    TrackerImporter,
} from '../../../components/field'
import ManualSyncAlert from '../../../components/noticeAlert/ManualSyncAlert'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import { authorityQuery } from '../../../modules/apiLoadFirstSetup'
import { createInitialValues } from './helper'
import {
    saveSynchronizationKeyMutation,
    useGetSyncDataStore,
} from '../SyncDatastoreQuery'

const GlobalSettings = () => {
    const {
        load,
        syncGlobal,
        syncSettings,
        dataSetSettings,
        programSettings,
    } = useGetSyncDataStore()
    const { data: authority } = useDataQuery(authorityQuery)
    const [settings, setSettings] = useState()
    const [initialValues, setInitialValues] = useState()
    const [disable, setDisable] = useState(false)
    const [disableSave, setDisableSave] = useState(true)

    const [mutate, { error, data }] = useDataMutation(
        saveSynchronizationKeyMutation
    )

    useEffect(() => {
        authority && setDisable(!authority.authority)
    }, [authority])

    useEffect(() => {
        if (syncSettings) {
            setSettings(syncGlobal)
            setInitialValues(syncGlobal)
        }
    }, [syncSettings])

    /**
     * Enable Save button if the settings are different from the one saved in the data store
     * */
    useEffect(() => {
        initialValues && settings && !isEqual(settings, initialValues)
            ? setDisableSave(false)
            : setDisableSave(true)
    }, [settings])

    const saveSettings = async () => {
        const settingsToSave = {
            ...createInitialValues(settings),
            dataSetSettings,
            programSettings,
        }
        await mutate({ settings: settingsToSave })
    }

    const resetSettings = () => {
        const settingsToReset = createInitialValues('')
        setSettings(settingsToReset)
    }

    return (
        <Page
            title={i18n.t('Global sync settings')}
            loading={load}
            unsavedChanges={!disableSave}
            authority={!disable}
        >
            {settings && (
                <>
                    <ManualSyncAlert />

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

                    <TrackerImporter
                        value={settings}
                        onChange={setSettings}
                        disabled={disable}
                    />

                    <FooterStripButtons
                        onSave={saveSettings}
                        onReset={resetSettings}
                        saveButtonDisabled={disableSave}
                        errorRequest={error}
                        requestResult={data}
                        handleDisableSave={setDisableSave}
                        disableAll={disable}
                    />
                </>
            )}
        </Page>
    )
}

export default GlobalSettings
