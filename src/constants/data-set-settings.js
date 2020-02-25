import i18n from '@dhis2/d2-i18n'

export const DataSetting = [
    {
        keyDownload: 'periodDSDownload',
        keyDBTrimming: 'periodDSDBTrimming',
        option: i18n.t('Periods'),
        download: [
            {
                label: i18n.t('Last 12 months'),
                value: 'Last 12 months',
            },
            {
                label:  i18n.t('Any'),
                value: 'ANY',
            },
            {
                label: i18n.t('Last month'),
                value: 'LAST_MONTH',
            },
            {
                label: i18n.t('Last 3 months'),
                value: 'LAST_3_MONTHS',
            },
            {
                label: i18n.t('Last 12 months'),
                value: 'LAST_12_MONTHS',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('Any'),
                value: 'ANY',
            },
            {
                label: i18n.t('Last month'),
                value: 'LAST_MONTH',
            },
            {
                label: i18n.t('Last 3 months'),
                value: 'LAST_3_MONTHS',
            },
            {
                label: i18n.t('Last 12 months'),
                value: 'LAST_12_MONTHS',
            },
        ],
    },
]

export const DataSpecificSetting = [
    {
        keyDownload: 'periodDSDownload',
        keyDBTrimming: 'periodDSDBTrimming',
        option: i18n.t('Periods'),
        download: [
            {
                label: i18n.t('Any'),
                value: 'ANY',
            },
            {
                label: i18n.t('Last month'),
                value: 'LAST_MONTH',
            },
            {
                label: i18n.t('Last 3 months'),
                value: 'LAST_3_MONTHS',
            },
            {
                label: i18n.t('Last 12 months'),
                value: 'LAST_12_MONTHS',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('Any'),
                value: 'ANY',
            },
            {
                label: i18n.t('Last month'),
                value: 'LAST_MONTH',
            },
            {
                label: i18n.t('Last 3 months'),
                value: 'LAST_3_MONTHS',
            },
            {
                label:  i18n.t('Last 12 months'),
                value: 'LAST_12_MONTHS',
            },
        ],
    },
]

export const DataSetSettingsDefault = {
    periodDSDownload: 'LAST_12_MONTHS',
    periodDSDBTrimming: 'LAST_12_MONTHS',
}
