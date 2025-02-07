import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useState } from 'react'
import { useIsAuthorized } from '../../../auth'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import Page from '../../../components/page/Page'
import { removeSummaryFromSettings } from '../../../utils/utils'
import {
    saveAppearanceKeyMutation,
    useReadAppearanceDataStore,
} from '../appearanceDatastoreQuery'
import DatasetGlobalSettings from './DatasetGlobalSettings'
import DatasetSpecificSettings from './DatasetSpecificSettings'
import { createInitialValues, prepareDataSetConfiguration } from './helper'

const DatasetsAppearance = () => {
    const {
        load,
        dataSetSettings,
        dataSetConfiguration,
        programConfiguration,
        completionSpinner,
        home,
        programSettings,
    } = useReadAppearanceDataStore()
    const { hasAuthority } = useIsAuthorized()
    const [disableSave, setDisableSave] = useState(true)
    const [initialValues, setInitialValues] = useState()
    const [globalSettings, setGlobalSettings] = useState()
    const [specificSettings, setSpecificSettings] = useState()
    const [configuration, setConfiguration] = useState()
    const [initialConfiguration, setInitialConfiguration] = useState()
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data: updateResult }] = useDataMutation(
        saveAppearanceKeyMutation
    )

    useEffect(() => {
        setDisable(!hasAuthority)
    }, [hasAuthority])

    useEffect(() => {
        if (dataSetSettings) {
            const { globalSettings, specificSettings } = dataSetSettings
            setInitialValues({
                globalSettings,
                specificSettings,
            })
            setGlobalSettings(createInitialValues(globalSettings))
            dataSetSettings.specificSettings
                ? setSpecificSettings(dataSetSettings.specificSettings)
                : setSpecificSettings({})
            setInitialConfiguration(dataSetConfiguration)
            dataSetConfiguration
                ? setConfiguration(dataSetConfiguration)
                : setConfiguration({})
        }
    }, [dataSetSettings])

    useEffect(() => {
        if (globalSettings) {
            !isEqual(globalSettings, initialValues.globalSettings) ||
            !isEqual(specificSettings, initialValues.specificSettings) ||
            !isEqual(configuration, initialConfiguration)
                ? setDisableSave(false)
                : setDisableSave(true)
        }
    }, [globalSettings, specificSettings])

    const saveSettings = async () => {
        const settingsToSave = {
            programConfiguration,
            completionSpinner,
            filterSorting: {
                home,
                programSettings,
                dataSetSettings: {
                    globalSettings,
                    specificSettings: {
                        ...removeSummaryFromSettings(specificSettings),
                    },
                },
            },
            dataSetConfiguration: {
                ...prepareDataSetConfiguration(configuration),
            },
        }
        await mutate({ settings: settingsToSave })
    }

    const resetSettings = () => {
        setGlobalSettings(createInitialValues(''))
        setSpecificSettings({})
        setConfiguration({})
    }

    return (
        <Page
            title={i18n.t('Data set')}
            desc={i18n.t(
                'Customize filter and sorting options available for data sets. Settings below apply to all data sets a mobile user has access to. Settings specific to individual data sets can also be applied.'
            )}
            loading={load}
            unsavedChanges={!disableSave}
            authority={!disable}
        >
            {globalSettings && (
                <>
                    <DatasetGlobalSettings
                        settings={globalSettings}
                        onChange={setGlobalSettings}
                        disable={disable}
                    />

                    <DatasetSpecificSettings
                        specificSettings={specificSettings}
                        onChange={setSpecificSettings}
                        configuration={configuration}
                        onChangeConfiguration={setConfiguration}
                        disabled={disable}
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
