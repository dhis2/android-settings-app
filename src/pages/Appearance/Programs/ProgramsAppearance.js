import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import { authorityQuery } from '../../../modules/apiLoadFirstSetup'
import {
    saveAppearanceKeyMutation,
    useReadAppearanceDataStore,
} from '../appearanceDatastoreQuery'
import {
    createInitialSpinnerValue,
    createInitialValues,
    createSpecificValues,
} from './helper'
import Page from '../../../components/page/Page'
import ProgramGlobalSettings from './ProgramGlobalSettings'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import ProgramSpecificSettings from './ProgramSpecificSettings'
import { removeSummaryFromSettings } from '../../../utils/utils'

const ProgramsAppearance = () => {
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
    const [specificSettings, setSpecificSettings] = useState()
    const [spinnerSettings, setSpinnerSettings] = useState()
    const [spinnerGlobal, setSpinnerGlobal] = useState()
    const [spinnerSpecific, setSpinnerSpecific] = useState()
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data: updateResult }] = useDataMutation(
        saveAppearanceKeyMutation
    )

    useEffect(() => {
        data && setDisable(!data.authority)
    }, [data])

    useEffect(() => {
        if (programSettings && completionSpinner) {
            const { globalSettings, specificSettings } = programSettings
            setInitialValues({ globalSettings, specificSettings })
            setGlobalSettings(createInitialValues(globalSettings))
            programSettings.specificSettings
                ? setSpecificSettings(
                      createSpecificValues(programSettings.specificSettings)
                  )
                : setSpecificSettings({})
            setSpinnerSettings(completionSpinner)
            setSpinnerGlobal(completionSpinner.globalSettings)
            setSpinnerSpecific(completionSpinner.specificSettings)
        }
    }, [programSettings])

    useEffect(() => {
        if (globalSettings) {
            !isEqual(globalSettings, initialValues.globalSettings) ||
            !isEqual(specificSettings, initialValues.specificSettings) ||
            !isEqual(spinnerGlobal, spinnerSettings.globalSettings) ||
            !isEqual(spinnerSpecific, spinnerSettings.specificSettings)
                ? setDisableSave(false)
                : setDisableSave(true)
        }
    }, [globalSettings, specificSettings, spinnerGlobal, spinnerSpecific])

    const saveSettings = async () => {
        const settingsToSave = {
            completionSpinner: {
                globalSettings: {
                    ...spinnerGlobal,
                },
                specificSettings: {
                    ...removeSummaryFromSettings(spinnerSpecific),
                },
            },
            filterSorting: {
                home,
                dataSetSettings,
                programSettings: {
                    globalSettings,
                    specificSettings: {
                        ...removeSummaryFromSettings(specificSettings),
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
