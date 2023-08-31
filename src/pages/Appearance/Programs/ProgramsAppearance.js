import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useState } from 'react'
import { useIsAuthorized } from '../../../auth'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import Page from '../../../components/page/Page'
import {
    saveAppearanceKeyMutation,
    useReadAppearanceDataStore,
} from '../appearanceDatastoreQuery'
import {
    createInitialGlobalSpinner,
    createInitialGlobalSpinnerPrevious,
    createInitialSpinnerValue,
    createInitialValues,
    createSpecificValues,
    prepareSettingsSaveDataStore,
    prepareSpinnerPreviousSpinner,
    removeAttributes,
} from './helper'
import ProgramGlobalSettings from './ProgramGlobalSettings'
import ProgramSpecificSettings from './ProgramSpecificSettings'

const ProgramsAppearance = () => {
    const {
        load,
        dataSetSettings,
        programConfiguration,
        home,
        programSettings,
    } = useReadAppearanceDataStore()
    const { hasAuthority } = useIsAuthorized()
    const [disableSave, setDisableSave] = useState(true)
    const [initialValues, setInitialValues] = useState()
    const [globalSettings, setGlobalSettings] = useState()
    const [specificSettings, setSpecificSettings] = useState()
    const [spinnerSettings, setSpinnerSettings] = useState()
    const [spinnerGlobal, setSpinnerGlobal] = useState()
    const [spinnerSpecific, setSpinnerSpecific] = useState()
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data: updateResult }] = useDataMutation(
        saveAppearanceKeyMutation
    )

    useEffect(() => {
        setDisable(!hasAuthority)
    }, [hasAuthority])

    useEffect(() => {
        if (programSettings && programConfiguration) {
            const { globalSettings, specificSettings } = programSettings
            setInitialValues({ globalSettings, specificSettings })
            setGlobalSettings(createInitialValues(globalSettings))
            programSettings.specificSettings
                ? setSpecificSettings(
                      createSpecificValues(programSettings.specificSettings)
                  )
                : setSpecificSettings({})
            setSpinnerSettings(programConfiguration)
            setSpinnerGlobal(
                createInitialGlobalSpinner(programConfiguration.globalSettings)
            )
            setSpinnerSpecific(programConfiguration.specificSettings)
        }
    }, [programSettings])

    useEffect(() => {
        if (globalSettings) {
            !isEqual(globalSettings, initialValues.globalSettings) ||
            !isEqual(
                removeAttributes(specificSettings),
                initialValues.specificSettings
            ) ||
            !isEqual(spinnerGlobal, spinnerSettings.globalSettings) ||
            !isEqual(spinnerSpecific, spinnerSettings.specificSettings)
                ? setDisableSave(false)
                : setDisableSave(true)
        }
    }, [globalSettings, specificSettings, spinnerGlobal, spinnerSpecific])

    const saveSettings = async () => {
        const settingsToSave = {
            programConfiguration: {
                globalSettings: {
                    ...spinnerGlobal,
                },
                specificSettings: {
                    ...prepareSettingsSaveDataStore(spinnerSpecific),
                },
            },
            completionSpinner: {
                globalSettings: {
                    ...createInitialGlobalSpinnerPrevious(spinnerGlobal),
                },
                specificSettings: {
                    ...prepareSpinnerPreviousSpinner(spinnerSpecific),
                },
            },
            filterSorting: {
                home,
                dataSetSettings,
                programSettings: {
                    globalSettings,
                    specificSettings: {
                        ...prepareSettingsSaveDataStore(specificSettings),
                    },
                },
            },
        }
        await mutate({ settings: settingsToSave })
    }

    const resetSettings = () => {
        setGlobalSettings(createInitialValues(''))
        setSpecificSettings({})
        setSpinnerGlobal(createInitialSpinnerValue(''))
    }

    return (
        <Page
            title={i18n.t('Program')}
            desc={i18n.t(
                'Customize filter and sorting options available for programs. Settings below apply to all programs a mobile user has access to. Settings specific to individual programs can also be applied.'
            )}
            unsavedChanges={!disableSave}
            loading={load}
            authority={!disable}
        >
            {globalSettings && (
                <>
                    <ProgramGlobalSettings
                        settings={globalSettings}
                        onChange={setGlobalSettings}
                        spinnerSettings={spinnerGlobal}
                        onChangeSpinner={setSpinnerGlobal}
                        disableAll={disable}
                    />
                    <ProgramSpecificSettings
                        onChange={setSpecificSettings}
                        specificSettings={specificSettings}
                        spinnerSettings={spinnerSpecific}
                        onChangeSpinner={setSpinnerSpecific}
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

export default ProgramsAppearance
