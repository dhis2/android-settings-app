import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useState } from 'react'
import { useIsAuthorized } from '../../../auth'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons.jsx'
import Page from '../../../components/page/Page.jsx'
import {
    saveSynchronizationKeyMutation,
    useGetSyncDataStore,
} from '../SyncDatastoreQuery'
import DatasetGlobalSettings from './DatasetGlobalSettings.jsx'
import DatasetSpecificSettings from './DatasetSpecificSettings.jsx'
import { createInitialValues } from './helper'

const DatasetSyncSettings = () => {
    const { load, programSettings, syncGlobal, dataSetSettings } =
        useGetSyncDataStore()
    const [initialValues, setInitialValues] = useState()
    const [disableSave, setDisableSave] = useState(true)
    const [disable, setDisable] = useState(false)
    const [globalSettings, setGlobalSettings] = useState()
    const [specificSettings, setSpecificSettings] = useState()
    const { hasAuthority } = useIsAuthorized()
    const [mutate, { error, data }] = useDataMutation(
        saveSynchronizationKeyMutation
    )

    useEffect(() => {
        setDisable(!hasAuthority)
    }, [hasAuthority])

    useEffect(() => {
        if (dataSetSettings) {
            const { specificSettings, lastUpdated, ...globalSettings } =
                dataSetSettings
            setInitialValues({
                ...globalSettings,
                specificSettings,
            })
            setGlobalSettings(dataSetSettings.globalSettings)
            setSpecificSettings(dataSetSettings.specificSettings)
        }
    }, [dataSetSettings])

    useEffect(() => {
        if (globalSettings && specificSettings) {
            !isEqual(globalSettings, initialValues.globalSettings) ||
            !isEqual(specificSettings, initialValues.specificSettings)
                ? setDisableSave(false)
                : setDisableSave(true)
        }
    }, [globalSettings, initialValues, specificSettings])

    const resetSettings = () => {
        setGlobalSettings(createInitialValues(''))
        setSpecificSettings({})
    }

    const saveSettings = async () => {
        const updateSettings = {
            ...syncGlobal,
            programSettings,
            dataSetSettings: {
                globalSettings,
                specificSettings,
            },
        }

        await mutate({ settings: updateSettings })
    }

    return (
        <Page
            title={i18n.t('Data set global download sync settings')}
            desc={i18n.t(
                'Applies to all Data sets an Android user has access to. Specific data set settings can be defined in the section below.'
            )}
            loading={load}
            unsavedChanges={!disableSave}
            authority={!disable}
        >
            {globalSettings && (
                <>
                    <DatasetGlobalSettings
                        settings={globalSettings}
                        handleChange={setGlobalSettings}
                        disable={disable}
                    />

                    <DatasetSpecificSettings
                        specificSettings={specificSettings}
                        handleSpecificSettings={setSpecificSettings}
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

export default DatasetSyncSettings
