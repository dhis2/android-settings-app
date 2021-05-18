import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import {
    saveSynchronizationKeyMutation,
    useGetSyncDataStore,
} from '../SyncDatastoreQuery'
import { authorityQuery } from '../../../modules/apiLoadFirstSetup'
import Page from '../../../components/page/Page'
import DatasetGlobalSettings from './DatasetGlobalSettings'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import { populateSettingObject } from '../../../modules/dataset/populateSettingObject'
import { DEFAULT } from '../../../constants/data-set-settings'

const DatasetSyncSettings = () => {
    const {
        load,
        programSettings,
        syncGlobal,
        dataSetSettings,
    } = useGetSyncDataStore()
    const [initialValues, setInitialValues] = useState()
    const [disableSave, setDisableSave] = useState(true)
    const [disable, setDisable] = useState(false)
    const [globalSettings, setGlobalSettings] = useState()

    const { data: authority } = useDataQuery(authorityQuery)
    const [mutate, { error, data }] = useDataMutation(
        saveSynchronizationKeyMutation
    )

    useEffect(() => {
        authority && setDisable(!authority.authority)
    }, [authority])

    useEffect(() => {
        if (dataSetSettings) {
            const {
                specificSettings,
                lastUpdated,
                ...globalSettings
            } = dataSetSettings
            setInitialValues({
                ...globalSettings,
                specificSettings,
            })
            setGlobalSettings(dataSetSettings.globalSettings)
        }
    }, [dataSetSettings])

    useEffect(() => {
        if (globalSettings) {
            !isEqual(globalSettings, initialValues.globalSettings)
                ? setDisableSave(false)
                : setDisableSave(true)
        }
    }, [globalSettings, initialValues])

    const resetSettings = () => {
        setGlobalSettings(populateSettingObject(DEFAULT))
    }

    const saveSettings = async () => {
        const updateSettings = {
            ...syncGlobal,
            programSettings,
            dataSetSettings: {
                globalSettings,
                specificSettings: {},
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
        >
            {globalSettings && (
                <>
                    <DatasetGlobalSettings
                        settings={globalSettings}
                        handleChange={setGlobalSettings}
                        disable={disable}
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
