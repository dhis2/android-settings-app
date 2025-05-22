import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { NoticeInfo } from './NoticeInfo'

export const CustomIntentInfo = () => (
    <NoticeInfo
        title={i18n.t('No custom Intents found')}
        notice={i18n.t(
            "It looks like there aren't any configured actions, or they couldn't be loaded."
        )}
    />
)

