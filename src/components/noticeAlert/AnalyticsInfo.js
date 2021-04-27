import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { NoticeInfo } from './NoticeInfo'

const AnalyticsInfo = () => (
    <NoticeInfo
        title={i18n.t('No TEI Analytics found')}
        notice={i18n.t(
            "It looks like there aren't any configured analytics, or they couldn't be loaded."
        )}
    />
)

export default AnalyticsInfo
