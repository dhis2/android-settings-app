import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useState } from 'react'
import {
    EncryptDB,
    MatomoId,
    MatomoUrl,
    ReservedValues,
    ShareScreen,
    SmsGateway,
    SmsResultSender,
} from '../../components/field'
import FooterStripButtons from '../../components/footerStripButton/FooterStripButtons'
import Page from '../../components/page/Page'
import { authorityQuery } from '../../modules'
import DisableSettings from './DisableSettings'
import {
    getGeneralKeyQuery,
    updateGeneralKeyMutation,
} from './generalDatastoreApi'
import {
    checkValidSettings,
    createInitialValues,
    notValidFields,
} from './helper'

const GeneralSettings = () => {
    const { loading, data: queryResult } = useDataQuery(getGeneralKeyQuery)
    const { data } = useDataQuery(authorityQuery)
    const [settings, setSettings] = useState()
    const [initialValues, setInitialValues] = useState()
    const [disableSave, setDisableSave] = useState(true)
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data: updateResult }] = useDataMutation(
        updateGeneralKeyMutation
    )

    useEffect(() => {
        data && setDisable(!data.authority)
    }, [data])

    useEffect(() => {
        if (queryResult) {
            const { lastUpdated, ...initialSettings } =
                queryResult.generalSettings
            setInitialValues(initialSettings)
            setSettings(createInitialValues(initialSettings))
        }
    }, [queryResult])

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
        <Page
            title={i18n.t('General Settings')}
            loading={loading}
            unsavedChanges={!disableSave}
            authority={!disable}
        >
            {settings && (
                <>
                    <MatomoUrl
                        value={settings}
                        onChange={setSettings}
                        disabled={disable}
                    />
                    <MatomoId
                        value={settings}
                        onChange={setSettings}
                        disabled={disable}
                    />
                    <SmsGateway
                        value={settings}
                        onChange={setSettings}
                        disabled={disable}
                    />
                    <SmsResultSender
                        value={settings}
                        onChange={setSettings}
                        disabled={disable}
                    />
                    <ReservedValues
                        value={settings}
                        onChange={setSettings}
                        disabled={disable}
                    />
                    <EncryptDB
                        value={settings}
                        onChange={setSettings}
                        disabled={disable}
                    />
                    <ShareScreen
                        value={settings}
                        onChange={setSettings}
                        disabled={disable}
                    />
                    <DisableSettings disabled={disable} />
                    <FooterStripButtons
                        onSave={saveSettings}
                        onReset={resetSettings}
                        saveButtonDisabled={disableSave}
                        errorRequest={error}
                        requestResult={updateResult}
                        handleDisableSave={setDisableSave}
                        disableAll={disable}
                    />
                </>
            )}
        </Page>
    )
}

export default GeneralSettings
