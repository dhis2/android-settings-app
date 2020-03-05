import i18n from '@dhis2/d2-i18n'

export const DataSetting = [
    {
        keyDownload: 'periodDSDownload',
        keyDBTrimming: 'periodDSDBTrimming',
        option: i18n.t('Number of Periods'),
    },
]

export const DataSpecificSetting = [
    {
        keyDownload: 'periodDSDownload',
        keyDBTrimming: 'periodDSDBTrimming',
        option: i18n.t('Number of Periods'),
    },
]

export const DataSetSettingsDefault = {
    periodDSDownload: 12,
    periodDSDBTrimming: 12,
}
