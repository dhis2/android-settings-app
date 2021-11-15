import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import Page from '../../../components/page/Page'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import {
    saveAnalyticsKeyMutation,
    useReadAnalyticsDataStore,
} from '../analyticsDatastoreQuery'
import { authorityQuery } from '../../../modules/apiLoadFirstSetup'
import { VisualizationsInfo } from '../../../components/noticeAlert'
import DatasetAnalyticList from './DatasetAnalyticList'
import { createDataStoreGroupRows } from './helper'

const DatasetAnalytics = () => {
    const {
        tei,
        home,
        program,
        dataSet,
        load,
        errorDataStore,
    } = useReadAnalyticsDataStore()
    const { data: hasAuthority } = useDataQuery(authorityQuery)
    const [datasetAnalytics, setDatasetAnalytics] = useState()
    const [initialValues, setInitialValues] = useState()
    const [disableSave, setDisableSave] = useState(true)
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data }] = useDataMutation(saveAnalyticsKeyMutation)

    useEffect(() => {
        hasAuthority && setDisable(!hasAuthority.authority)
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
