import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import {
    saveAnalyticsKeyMutation,
    useReadAnalyticsDataStore,
} from '../analyticsDatastoreQuery'
import { authorityQuery } from '../../../modules/apiLoadFirstSetup'
import Page from '../../../components/page/Page'
import AnalyticsInfo from '../../../components/noticeAlert/AnalyticsInfo'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons'
import AnalyticsSpecificTEI from './AnalyticsSpecificTEI'
import { removeSummarySettings } from './helper'

const AnalyticsTEI = () => {
    const {
        tei,
        dhisVisualizations,
        errorDataStore,
        load,
    } = useReadAnalyticsDataStore()
    const { data: hasAuthority } = useDataQuery(authorityQuery)
    const [analyticSettings, setAnalyticSettings] = useState([])
    const [disableSave, setDisableSave] = useState(true)
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data }] = useDataMutation(saveAnalyticsKeyMutation)

    useEffect(() => {
        hasAuthority && setDisable(!hasAuthority.authority)
    }, [hasAuthority])

    useEffect(() => {
        if (tei) {
            setAnalyticSettings(tei)
        }
    }, [tei])

    useEffect(() => {
        tei && analyticSettings && !isEqual(analyticSettings, tei)
            ? setDisableSave(false)
            : setDisableSave(true)
    }, [analyticSettings])

    const saveSettings = async () => {
        const settingsToSave = {
            tei: removeSummarySettings(analyticSettings),
            dhisVisualizations,
        }

        await mutate({ settings: settingsToSave })
    }

    const resetSettings = () => {
        setAnalyticSettings([])
    }

    return (
        <Page
            title={i18n.t('TEI Analytics')}
            desc={i18n.t(
                'Manage Tracked Entity Instance (TEI) analytics for tracker programs. The settings below apply to all tracker programs an Android user has access to.'
            )}
            loading={load}
            error={errorDataStore}
            unsavedChanges={!disableSave}
        >
            {analyticSettings && (
                <>
                    {analyticSettings.length === 0 && <AnalyticsInfo />}

                    <AnalyticsSpecificTEI
                        disable={disable}
                        settings={analyticSettings}
                        handleSettings={setAnalyticSettings}
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

export default AnalyticsTEI
