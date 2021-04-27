import React from 'react'
import i18n from '@dhis2/d2-i18n'
import NoticeAlert from './NoticeAlert'

const ManualSyncAlert = () => (
    <NoticeAlert
        title={i18n.t('Manual options')}
        notice={i18n.t(
            'Manual options for data and metadata sync are only available from android app version 2.3.0 onwards.'
        )}
    />
)

export default ManualSyncAlert
