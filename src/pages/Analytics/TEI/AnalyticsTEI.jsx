import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useState } from 'react'
import { useIsAuthorized } from '../../../auth'
import FooterStripButtons from '../../../components/footerStripButton/FooterStripButtons.jsx'
import AnalyticsInfo from '../../../components/noticeAlert/AnalyticsInfo.jsx'
import Page from '../../../components/page/Page.jsx'
import {
    saveAnalyticsKeyMutation,
    useReadAnalyticsDataStore,
} from '../analyticsDatastoreQuery'
import AnalyticsSpecificTEI from './AnalyticsSpecificTEI.jsx'
import { dataStoreSettings } from './helper'

const AnalyticsTEI = () => {
    const { tei, dhisVisualizations, errorDataStore, load } =
        useReadAnalyticsDataStore()
    const { hasAuthority } = useIsAuthorized()
    const [analyticSettings, setAnalyticSettings] = useState([])
    const [disableSave, setDisableSave] = useState(true)
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data }] = useDataMutation(saveAnalyticsKeyMutation)

    useEffect(() => {
        setDisable(!hasAuthority)
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
            tei: dataStoreSettings(analyticSettings),
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
            authority={!disable}
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
