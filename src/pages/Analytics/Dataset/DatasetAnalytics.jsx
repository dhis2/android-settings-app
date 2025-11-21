import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useState } from 'react'
import { useIsAuthorized } from '../../../auth'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons.jsx'
import { VisualizationsInfo } from '../../../components/noticeAlert'
import Page from '../../../components/page/Page.jsx'
import {
    saveAnalyticsKeyMutation,
    useReadAnalyticsDataStore,
} from '../analyticsDatastoreQuery'
import DatasetAnalyticList from './DatasetAnalyticList.jsx'
import { createDataStoreGroupRows } from './helper'

const DatasetAnalytics = () => {
    const { tei, home, program, dataSet, load, errorDataStore } =
        useReadAnalyticsDataStore()
    const { hasAuthority } = useIsAuthorized()
    const [datasetAnalytics, setDatasetAnalytics] = useState()
    const [initialValues, setInitialValues] = useState()
    const [disableSave, setDisableSave] = useState(true)
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data }] = useDataMutation(saveAnalyticsKeyMutation)

    useEffect(() => {
        setDisable(!hasAuthority)
    }, [hasAuthority])

    useEffect(() => {
        if (dataSet) {
            setDatasetAnalytics(dataSet)
            setInitialValues(dataSet)
        }
    }, [dataSet])

    useEffect(() => {
        initialValues &&
        datasetAnalytics &&
        !isEqual(datasetAnalytics, initialValues)
            ? setDisableSave(false)
            : setDisableSave(true)
    }, [datasetAnalytics])

    const saveSettings = async () => {
        const settingsToSave = {
            tei,
            dhisVisualizations: {
                home,
                program,
                dataSet: createDataStoreGroupRows(datasetAnalytics),
            },
        }

        await mutate({ settings: settingsToSave })
    }

    const resetSettings = () => {
        setDatasetAnalytics({})
    }

    return (
        <Page
            title={i18n.t('Data set')}
            desc={i18n.t('Manage visualizations for data set.')}
            loading={load}
            error={errorDataStore}
            unsavedChanges={!disableSave}
            authority={!disable}
        >
            {datasetAnalytics && (
                <>
                    {isEmpty(datasetAnalytics) && (
                        <VisualizationsInfo
                            title={i18n.t(
                                'Could not find any data set visualisations'
                            )}
                        />
                    )}

                    <DatasetAnalyticList
                        disable={disable}
                        visualizations={datasetAnalytics}
                        handleVisualizations={setDatasetAnalytics}
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

export default DatasetAnalytics
