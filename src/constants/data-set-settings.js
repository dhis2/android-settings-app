import i18n from '@dhis2/d2-i18n'

export const DataSetting = [
    {
        keyDownload: 'periodDSDownload',
        keyDBTrimming: 'periodDSDBTrimming',
        option: i18n.t('Periods'),
        download: [
            {
                label: i18n.t('Any'),
                value: 'Any',
            },
            {
                label: i18n.t('Last month'),
                value: 'Last month',
            },
            {
                label: i18n.t('Last 3 months'),
                value: 'Last 3 months',
            },
            {
                label: i18n.t('Last 12 months'),
                value: 'Last 12 months',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('Any'),
                value: 'Any',
            },
            {
                label: i18n.t('Last month'),
                value: 'Last month',
            },
            {
                label: i18n.t('Last 3 months'),
                value: 'Last 3 months',
            },
            {
                label: i18n.t('Last 12 months'),
                value: 'Last 12 months',
            },
        ],
    },
]

export const DataSpecificSetting = [
    {
        keyDownload: 'specificPeriodDSDownload',
        keyDBTrimming: 'specificPeriodDSDBTrimming',
        option: i18n.t('Periods'),
        download: [
            {
                label: i18n.t('Any'),
                value: 'Any',
            },
            {
                label: i18n.t('Last month'),
                value: 'Last month',
            },
            {
                label: i18n.t('Last 3 months'),
                value: 'Last 3 months',
            },
            {
                label: i18n.t('Last 12 months'),
                value: 'Last 12 months',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('Any'),
                value: 'Any',
            },
            {
                label: i18n.t('Last month'),
                value: 'Last month',
            },
            {
                label: i18n.t('Last 3 months'),
                value: 'Last 3 months',
            },
            {
                label: i18n.t('Last 12 months'),
                value: 'Last 12 months',
            },
        ],
    },
]

export const DataSetSettingsDefault = {
    periodDSDownload: 'Last 12 months',
    periodDSDBTrimming: 'Last 12 months',
}
