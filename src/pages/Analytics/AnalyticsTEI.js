import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import {
    getAnalyticsKeyQuery,
    saveAnalyticsKeyMutation,
} from './AnalyticsQueries'
import { authorityQuery } from '../../modules/apiLoadFirstSetup'
import Page from '../../components/page/Page'
import AnalyticsInfo from '../../components/noticeAlert/AnalyticsInfo'
import FooterStripButtons from '../../components/footerStripButton/FooterStripButtons'
import AnalyticsSpecificTEI from './AnalyticsSpecificTEI'

const AnalyticsTEI = () => {
    const { data: analytics, loading } = useDataQuery(getAnalyticsKeyQuery)
    const { data: hasAuthority } = useDataQuery(authorityQuery)
    const [analyticSettings, setAnalyticSettings] = useState([])
    const [initialValues, setInitialValues] = useState()
    const [disableSave, setDisableSave] = useState(true)
    const [disable, setDisable] = useState(false)

    const [mutate, { error, data }] = useDataMutation(saveAnalyticsKeyMutation)

    useEffect(() => {
        hasAuthority && setDisable(!hasAuthority.authority)
    }, [hasAuthority])

    useEffect(() => {
        if (analytics) {
            const settings = analytics.analytics.tei
            setInitialValues(settings)
            setAnalyticSettings(settings)
        }
    }, [analytics])

    useEffect(() => {
        initialValues &&
        analyticSettings &&
        !isEqual(analyticSettings, initialValues)
            ? setDisableSave(false)
            : setDisableSave(true)
    }, [analyticSettings])

    const saveSettings = async () => {
        const settingsToSave = {
            tei: analyticSettings,
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
            loading={loading}
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
