import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import isEqual from 'lodash/isEqual'
import Page from '../../../components/page/Page'
import HomeSettings from './HomeSettings'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import { createInitialValues } from './helper'
import {
    saveAppearanceKeyMutation,
    useReadAppearanceDataStore,
} from '../appearanceDatastoreQuery'
import { authorityQuery } from '../../../modules/apiLoadFirstSetup'

const HomeAppearance = () => {
    const {
        load,
        home,
        programConfiguration,
        completionSpinner,
        programSettings,
        dataSetSettings,
    } = useReadAppearanceDataStore()
    const { data } = useDataQuery(authorityQuery)
    const [settings, setSettings] = useState()
    const [initialValues, setInitialValues] = useState()
    const [disable, setDisable] = useState(false)
    const [disableSave, setDisableSave] = useState(true)

    const [mutate, { error, data: updateResult }] = useDataMutation(
        saveAppearanceKeyMutation
    )

    useEffect(() => {
        data && setDisable(!data.authority)
    }, [data])

    useEffect(() => {
        if (home) {
            setInitialValues(home)
            setSettings(createInitialValues(home))
        }
    }, [home])

    useEffect(() => {
        initialValues && settings && !isEqual(settings, initialValues)
            ? setDisableSave(false)
            : setDisableSave(true)
    }, [settings])

    const saveSettings = async () => {
        const settingsToSave = {
            programConfiguration,
            completionSpinner,
            filterSorting: {
                home: settings,
                programSettings,
                dataSetSettings,
            },
        }
        await mutate({ settings: settingsToSave })
    }

    const resetSettings = () => {
        setSettings(createInitialValues(''))
    }

    return (
        <Page
            title={i18n.t('Home Screen')}
            desc={i18n.t(
                'Customize the available filters and sorting options for the home screen. Filters and sorting options set here will only affect the home screen.'
            )}
            loading={load}
            unsavedChanges={!disableSave}
            authority={!disable}
        >
            {settings && (
                <>
                    <HomeSettings
                        states={settings}
                        onChange={setSettings}
                        disable={disable}
                    />

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

export default HomeAppearance
