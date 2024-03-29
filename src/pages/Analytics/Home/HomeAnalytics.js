import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useState } from 'react'
import { useIsAuthorized } from '../../../auth'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import { VisualizationsInfo } from '../../../components/noticeAlert'
import Page from '../../../components/page/Page'
import {
    saveAnalyticsKeyMutation,
    useReadAnalyticsDataStore,
} from '../analyticsDatastoreQuery'
import HomeAnalyticList from './HomeAnalyticList'

const HomeAnalytics = () => {
    const { tei, home, program, dataSet, load, errorDataStore } =
        useReadAnalyticsDataStore()
    const { hasAuthority } = useIsAuthorized()
    const [homeAnalytics, setHomeAnalytics] = useState([])
    const [disableSave, setDisableSave] = useState(true)
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data }] = useDataMutation(saveAnalyticsKeyMutation)

    useEffect(() => {
        setDisable(!hasAuthority)
    }, [hasAuthority])

    useEffect(() => {
        if (home) {
            setHomeAnalytics(home)
        }
    }, [home])

    useEffect(() => {
        home && homeAnalytics && !isEqual(homeAnalytics, home)
            ? setDisableSave(false)
            : setDisableSave(true)
    }, [homeAnalytics])

    const saveSettings = async () => {
        const settingsToSave = {
            tei,
            dhisVisualizations: {
                home: homeAnalytics,
                program,
                dataSet,
            },
        }
        await mutate({ settings: settingsToSave })
    }

    const resetSettings = () => {
        setHomeAnalytics([])
    }

    return (
        <Page
            title={i18n.t('Home')}
            desc={i18n.t('Manage visualizations for Home screen.')}
            loading={load}
            error={errorDataStore}
            unsavedChanges={!disableSave}
            authority={!disable}
        >
            {homeAnalytics && (
                <>
                    {isEmpty(homeAnalytics) && (
                        <VisualizationsInfo
                            title={i18n.t(
                                'Could not find any home visualisations'
                            )}
                        />
                    )}

                    <HomeAnalyticList
                        disable={disable}
                        visualizations={homeAnalytics}
                        handleVisualizations={setHomeAnalytics}
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

export default HomeAnalytics
