import React, { useEffect, useState } from 'react'
import isEqual from 'lodash/isEqual'
import i18n from '@dhis2/d2-i18n'
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import Page from '../../../components/page/Page'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import DatasetGlobalSettings from './DatasetGlobalSettings'
import {
    saveAppearanceKeyMutation,
    useReadAppearanceDataStore,
} from '../appearanceDatastoreQuery'
import { authorityQuery } from '../../../modules/apiLoadFirstSetup'
import { createInitialValues } from './helper'

const DatasetsAppearance = () => {
    const {
        load,
        dataSetSettings,
        completionSpinner,
        home,
        programSettings,
    } = useReadAppearanceDataStore()
    const { data } = useDataQuery(authorityQuery)
    const [disableSave, setDisableSave] = useState(true)
    const [initialValues, setInitialValues] = useState()
    const [globalSettings, setGlobalSettings] = useState()
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data: updateResult }] = useDataMutation(
        saveAppearanceKeyMutation
    )

    useEffect(() => {
        data && setDisable(!data.authority)
    }, [data])

    useEffect(() => {
        if (dataSetSettings) {
            const { globalSettings } = dataSetSettings
            setInitialValues({
                globalSettings,
            })
            setGlobalSettings(createInitialValues(globalSettings))
        }
    }, [dataSetSettings])

    useEffect(() => {
        if (globalSettings) {
            !isEqual(globalSettings, initialValues.globalSettings)
                ? setDisableSave(false)
                : setDisableSave(true)
        }
    }, [globalSettings])

    const saveSettings = async () => {
        const settingsToSave = {
            completionSpinner,
            filterSorting: {
                home,
                programSettings,
                dataSetSettings: {
                    globalSettings,
                    specificSettings: {},
                },
            },
        }

        await mutate({ settings: settingsToSave })
    }

    const resetSettings = () => {
        setGlobalSettings(createInitialValues(''))
    }

    return (
        <Page
            title={i18n.t('Data set')}
            desc={i18n.t(
                'Customize filter and sorting options available for data sets. Settings below apply to all data sets a mobile user has access to. Settings specific to individual data sets can also be applied.'
            )}
            loading={load}
            unsavedChanges={!disableSave}
        >
            {globalSettings && (
                <>
                    <DatasetGlobalSettings
                        settings={globalSettings}
                        onChange={setGlobalSettings}
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

export default DatasetsAppearance
