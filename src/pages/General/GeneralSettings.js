import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { useDataMutation } from '@dhis2/app-runtime'
import isEqual from 'lodash/isEqual'
import Page from '../../components/page/Page'
import {
    EncryptDB,
    MatomoId,
    MatomoUrl,
    ReservedValues,
    SmsGateway,
    SmsResultSender,
} from '../../components/field'
import FooterStripButtons from '../../components/footerStripButton/FooterStripButtons'
import DisableSettings from './DisableSettings'
import { useGeneralDataStore } from '../../modules/useDatastore'
import {
    checkValidSettings,
    createInitialValues,
    notValidFields,
} from './helper'
import { saveGeneralKeyMutation } from './queryMutation'

const PAGE_NAME = i18n.t('General Settings')

const GeneralSettings = () => {
    const { load, generalSettings } = useGeneralDataStore()
    const [settings, setSettings] = useState()
    const [initialValues, setInitialValues] = useState()
    const [disableSave, setDisableSave] = useState(true)

    const [mutate, { error, data }] = useDataMutation(saveGeneralKeyMutation)

    useEffect(() => {
        if (generalSettings) {
            const { lastUpdated, ...initialSettings } = generalSettings
            setInitialValues(initialSettings)
            setSettings(createInitialValues(initialSettings))
        }
    }, [generalSettings])

    /**
     * Enable Save button if:
     *  the settings are different from the one saved in the data store
     *  the settings are valid inputs
     * */
    useEffect(() => {
        if (initialValues && settings) {
            const validSettings = checkValidSettings(settings)
            if (!isEqual(validSettings, initialValues)) {
                notValidFields(validSettings)
                    ? setDisableSave(true)
                    : setDisableSave(false)
            } else {
                setDisableSave(true)
            }
        }
    }, [settings])

    const saveSettings = async () => {
        await mutate({ settings: checkValidSettings(settings) })
    }

    const resetSettings = () => {
        setSettings(createInitialValues(''))
    }

    return (
        <Page title={PAGE_NAME} loading={load} unsavedChanges={!disableSave}>
            {settings && (
                <>
                    <MatomoUrl value={settings} onChange={setSettings} />

                    <MatomoId value={settings} onChange={setSettings} />

                    <SmsGateway value={settings} onChange={setSettings} />

                    <SmsResultSender value={settings} onChange={setSettings} />

                    <ReservedValues value={settings} onChange={setSettings} />

                    <EncryptDB value={settings} onChange={setSettings} />

                    <DisableSettings />

                    <FooterStripButtons
                        onSave={saveSettings}
                        onReset={resetSettings}
                        saveButtonDisabled={disableSave}
                        errorRequest={error}
                        requestResult={data}
                        handleDisableSave={setDisableSave}
                    />
                </>
            )}
        </Page>
    )
}

export default GeneralSettings
