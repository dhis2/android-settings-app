import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import { authorityQuery } from '../../../modules/apiLoadFirstSetup'
import {
    saveAppearanceKeyMutation,
    useReadAppearanceDataStore,
} from '../appearanceDatastoreQuery'
import { createInitialSpinnerValue, createInitialValues } from './helper'
import Page from '../../../components/page/Page'
import ProgramGlobalSettings from './ProgramGlobalSettings'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'

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
    const [spinnerSettings, setSpinnerSettings] = useState()
    const [spinnerGlobal, setSpinnerGlobal] = useState()
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data: updateResult }] = useDataMutation(
        saveAppearanceKeyMutation
    )

    useEffect(() => {
        data && setDisable(!data.authority)
    }, [data])

    useEffect(() => {
        if (programSettings && completionSpinner) {
            const { globalSettings } = programSettings
            setInitialValues({ globalSettings })
            setGlobalSettings(createInitialValues(globalSettings))
            setSpinnerSettings(completionSpinner)
            setSpinnerGlobal(completionSpinner.globalSettings)
        }
    }, [programSettings])

    useEffect(() => {
        if (globalSettings) {
            !isEqual(globalSettings, initialValues.globalSettings) ||
            !isEqual(spinnerGlobal, spinnerSettings.globalSettings)
                ? setDisableSave(false)
                : setDisableSave(true)
        }
    }, [globalSettings, spinnerGlobal])

    const saveSettings = async () => {
        const settingsToSave = {
            completionSpinner: {
                globalSettings: {
                    ...spinnerGlobal,
                },
                specificSettings: {},
            },
            filterSorting: {
                home,
                dataSetSettings,
                programSettings: {
                    globalSettings,
                    specificSettings: {},
                },
            },
        }
        await mutate({ settings: settingsToSave })
    }

    const resetSettings = () => {
        setGlobalSettings(createInitialValues(''))
        setSpinnerGlobal(createInitialSpinnerValue(''))
    }

    return (
        <Page
            title={i18n.t('Programs')}
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
