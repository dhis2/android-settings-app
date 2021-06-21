import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import Page from '../../../components/page/Page'
import ProgramGlobalSettings from './ProgramGlobalSettings'
import ProgramSpecificSettings from './ProgramSpecificSettings'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import {
    DEFAULT,
    GLOBAL,
    GLOBAL_SPECIAL,
    PER_ORG_UNIT,
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
    const [specificSettings, setSpecificSettings] = useState()
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
                specificSettings,
            })
            programSettings.globalSettings.settingDownload === GLOBAL ||
            programSettings.globalSettings.settingDownload === PER_ORG_UNIT
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
            programSettings.specificSettings
                ? setSpecificSettings(programSettings.specificSettings)
                : setSpecificSettings({})
        }
    }, [programSettings])

    useEffect(() => {
        if (globalSettings && specificSettings) {
            !isEqual(globalSettings, initialValues.globalSettings) ||
            !isEqual(specificSettings, initialValues.specificSettings)
                ? setDisableSave(false)
                : setDisableSave(true)
        }
    }, [globalSettings, specificSettings])

    const saveSettings = async () => {
        const updatedSettings = {
            ...syncGlobal,
            dataSetSettings,
            programSettings: {
                globalSettings,
                specificSettings,
            },
        }

        await mutate({ settings: updatedSettings })
    }

    const resetSettings = () => {
        setGlobalSettings(populateProgramObject(DEFAULT))
        setSpecificSettings({})
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

                    <ProgramSpecificSettings
                        specificSettings={specificSettings}
                        changeSpecificSettings={setSpecificSettings}
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

export default ProgramSyncSettings
