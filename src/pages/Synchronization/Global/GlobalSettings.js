import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useState } from 'react'
import { useIsAuthorized } from '../../../auth'
import {
    DataSync,
    FileMaxSize,
    MetadataSync,
    TrackerExporter,
    TrackerImporter,
} from '../../../components/field'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import { TrackerImporterInfo } from '../../../components/noticeAlert'
import Page from '../../../components/page/Page'
import { useApiVersion } from '../../../utils/useApiVersion'
import {
    saveSynchronizationKeyMutation,
    useGetSyncDataStore,
} from '../SyncDatastoreQuery'
import {
    checkValidSettings,
    createInitialValues,
    createValidValues,
} from './helper'

const GlobalSettings = () => {
    const { load, syncGlobal, syncSettings, dataSetSettings, programSettings } =
        useGetSyncDataStore()
    const { hasAuthority } = useIsAuthorized()
    const { apiVersion } = useApiVersion()
    const [settings, setSettings] = useState()
    const [initialValues, setInitialValues] = useState()
    const [disable, setDisable] = useState(false)
    const [disableSave, setDisableSave] = useState(true)

    const [mutate, { error, data }] = useDataMutation(
        saveSynchronizationKeyMutation
    )

    useEffect(() => {
        setDisable(!hasAuthority)
    }, [hasAuthority])

    useEffect(() => {
        if (syncSettings) {
            setSettings(createValidValues(syncGlobal))
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
            ...checkValidSettings(settings),
            dataSetSettings,
            programSettings,
        }
        await mutate({ settings: settingsToSave })
    }

    const resetSettings = () => {
        setSettings(createInitialValues('', apiVersion))
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
                    <TrackerImporterInfo />

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

                    <TrackerExporter
                        value={settings}
                        onChange={setSettings}
                        disabled={disable}
                    />

                    <FileMaxSize
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
