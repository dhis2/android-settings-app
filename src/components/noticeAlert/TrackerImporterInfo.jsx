import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { useApiVersion } from '../../utils/useApiVersion'
import { shouldUseNewTracker } from '../field'
import NoticeAlert from './NoticeAlert.jsx'

export const TrackerImporterInfo = () => {
    const { apiVersion } = useApiVersion()
    const validVersion = apiVersion && shouldUseNewTracker(apiVersion)

    const Info = () => (
        <>
            <p>
                {i18n.t(
                    'If the API version is 2.40 or higher, please note that the New Tracker Importer and New Tracker Exporter should be used as the default option.'
                )}
            </p>
            <p>
                {i18n.t(
                    'Be aware that some functionality might not be ready in the new endpoints, although primary use-cases are supported.'
                )}
            </p>
        </>
    )

    return (
        <>
            {validVersion && (
                <NoticeAlert
                    title={i18n.t('New Tracker Importer and Exporter')}
                    notice={Info()}
                />
            )}
        </>
    )
}
