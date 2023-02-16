import i18n from '@dhis2/d2-i18n'
import React from 'react'
import NoticeAlert from './NoticeAlert'

export const TrackerImporterInfo = () => (
    <NoticeAlert
        title={i18n.t('New Tracker Importer')}
        notice={i18n.t(
            'If the API version is 2.40 or higher, please note that the New Tracker Importer should be used as the default option.'
        )}
    />
)
