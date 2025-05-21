import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useState } from 'react'
import { useIsAuthorized } from '../../auth'
import FooterStripButtons from '../../components/footerStripButton/FooterStripButtons'
import { CustomIntentInfo } from '../../components/noticeAlert'
import Page from '../../components/page/Page'
import CustomIntentsList from './CustomIntentsList'
import {
    saveCustomIntentsMutation,
    useReadCustomIntentsDataStore,
} from './intentsDatastoreQuery'

const CustomIntents = () => {
    const { hasAuthority } = useIsAuthorized()
    const { customIntents, load, errorDataStore } =
        useReadCustomIntentsDataStore()
    const [disableSave, setDisableSave] = useState(true)
    const [customIntentSettings, setCustomIntentSettings] = useState([])

    useEffect(() => {
        if (customIntentSettings?.length === 0 && customIntents) {
            setCustomIntentSettings(customIntents)
        }
    }, [customIntents, customIntentSettings, setCustomIntentSettings])

    const [mutate, { error, data }] = useDataMutation(saveCustomIntentsMutation)

    useEffect(() => {
        customIntents &&
        customIntentSettings &&
        !isEqual(customIntents, customIntentSettings)
            ? setDisableSave(false)
            : setDisableSave(true)
    }, [customIntentSettings, customIntents, setDisableSave])

    const saveSettings = async () => {
        const settingsToSave = {
            customIntents: customIntentSettings,
        }

        await mutate({ settings: settingsToSave })
    }

    const resetSettings = () => {
        setCustomIntentSettings([])
    }

    return (
        <Page
            title={i18n.t('Custom Intents')}
            desc={i18n.t(
                'Define specific actions triggered from external sources to interact with other apps in the device.'
            )}
            authority={hasAuthority}
            unsavedChanges={!disableSave}
            loading={load}
            error={errorDataStore}
        >
            {customIntentSettings && (
                <>
                    {isEmpty(customIntentSettings) && <CustomIntentInfo />}
                    <CustomIntentsList
                        disable={!hasAuthority}
                        settings={customIntentSettings}
                        handleSettings={setCustomIntentSettings}
                    />
                    <FooterStripButtons
                        onSave={saveSettings}
                        onReset={resetSettings}
                        saveButtonDisabled={disableSave}
                        errorRequest={error}
                        requestResult={data}
                        handleDisableSave={setDisableSave}
                        disableAll={!hasAuthority}
                    />
                </>
            )}
        </Page>
    )
}

export default CustomIntents
