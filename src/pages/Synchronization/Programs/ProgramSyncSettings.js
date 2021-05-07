import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import Page from '../../../components/page/Page'
import ProgramGlobalSettings from './ProgramGlobalSettings'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import {
    DEFAULT,
    GLOBAL,
    GLOBAL_SPECIAL,
} from '../../../constants/program-settings'
import {
    saveSynchronizationKeyMutation,
    useGetSyncDataStore,
} from '../SyncDatastoreQuery'
import { authorityQuery } from '../../../modules/apiLoadFirstSetup'
import { populateProgramObject } from '../../../modules/programs/populateProgramObject'

const ProgramSyncSettings = () => {
    const {
        load,
        programSettings,
        syncGlobal,
        dataSetSettings,
    } = useGetSyncDataStore()
    const [initialValues, setInitialValues] = useState()
    const [disableSave, setDisableSave] = useState(true)
    const [globalSettings, setGlobalSettings] = useState()
    const [disable, setDisable] = useState(false)

    const { data: authority } = useDataQuery(authorityQuery)
    const [mutate, { error, data }] = useDataMutation(
        saveSynchronizationKeyMutation
    )

    useEffect(() => {
        authority && setDisable(!authority.authority)
    }, [authority])

    useEffect(() => {
        if (programSettings) {
            const {
                lastUpdated,
                specificSettings,
                ...initialGlobalSettings
            } = programSettings

            setInitialValues({
                ...initialGlobalSettings,
            })
            programSettings.globalSettings.settingDownload === GLOBAL
                ? setGlobalSettings(
                      populateProgramObject(
                          GLOBAL_SPECIAL,
                          programSettings.globalSettings
                      )
                  )
                : setGlobalSettings(
                      populateProgramObject(
                          GLOBAL,
                          programSettings.globalSettings
                      )
                  )
        }
    }, [programSettings])

    useEffect(() => {
        if (globalSettings) {
            !isEqual(globalSettings, initialValues.globalSettings)
                ? setDisableSave(false)
                : setDisableSave(true)
        }
    }, [globalSettings])

    const saveSettings = async () => {
        const updatedSettings = {
            ...syncGlobal,
            dataSetSettings,
            programSettings: {
                globalSettings,
                specificSettings: {},
            },
        }

        await mutate({ settings: updatedSettings })
    }

    const resetSettings = () => {
        setGlobalSettings(populateProgramObject(DEFAULT))
    }

    return (
        <Page
            title={i18n.t('Program global download sync settings')}
            desc={i18n.t(
                'Applies to all programs an Android user has access to. Specific program settings can be defined in the section below.'
            )}
            loading={load}
            unsavedChanges={!disableSave}
        >
            {globalSettings && (
                <>
                    <ProgramGlobalSettings
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

export default ProgramSyncSettings
