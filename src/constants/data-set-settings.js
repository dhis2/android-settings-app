import i18n from '@dhis2/d2-i18n'

export const DataSetting = [
    {
        keyDownload: 'periodDSDownload',
        keyDBTrimming: 'periodDSDBTrimming',
        option: i18n.t('Maximum number of periods to download data sets for'),
    },
]

export const DataSpecificSetting = [
    {
        keyDownload: 'periodDSDownload',
        keyDBTrimming: 'periodDSDBTrimming',
        option: i18n.t('Maximum number of periods to download data sets for'),
    },
]

export const dataSetSettingsDefault = {
    periodDSDownload: 11,
    periodDSDBTrimming: 11,
}

export const periodTypeConstants = {
    Daily: {
        type: 'Daily',
        default: 59,
        label: 'Daily',
    },
    Weekly: {
        type: 'Weekly',
        default: 12,
        label: 'Weekly',
    },
    WeeklyWednesday: {
        type: 'WeeklyWednesday',
        default: 12,
        label: 'Weekly (Start Wednesday)',
    },
    WeeklyThursday: {
        type: 'WeeklyThursday',
        default: 12,
        label: 'Weekly (Start Thursday)',
    },
    WeeklySaturday: {
        type: 'WeeklySaturday',
        default: 12,
        label: 'Weekly (Start Saturday)',
    },
    WeeklySunday: {
        type: 'WeeklySunday',
        default: 12,
        label: 'Weekly (Start Sunday)',
    },
    BiWeekly: {
        type: 'BiWeekly',
        default: 12,
        label: 'Bi-weekly',
    },
    Monthly: {
        type: 'Monthly',
        default: 11,
        label: 'Monthly',
    },
    BiMonthly: {
        type: 'BiMonthly',
        default: 5,
        label: 'Bi-monthly',
    },
    Quarterly: {
        type: 'Quarterly',
        default: 4,
        label: 'Quarterly',
    },
    SixMonthly: {
        type: 'SixMonthly',
        default: 4,
        label: 'Six-monthly',
    },
    SixMonthlyApril: {
        type: 'SixMonthlyApril',
        default: 4,
        label: 'Six-monthly April',
    },
    SixMonthlyNov: {
        type: 'SixMonthlyNov',
        default: 4,
        label: 'Six-monthly November',
    },
    Yearly: {
        type: 'Yearly',
        default: 4,
        label: 'Yearly',
    },
    FinancialApril: {
        type: 'FinancialApril',
        default: 4,
        label: 'Financial year (Start April)',
    },
    FinancialJuly: {
        type: 'FinancialJuly',
        default: 4,
        label: 'Financial year (Start July)',
    },
    FinancialOct: {
        type: 'FinancialOct',
        default: 4,
        label: 'Financial year (Start October)',
    },
    FinancialNov: {
        type: 'FinancialNov',
        default: 4,
        label: 'Financial year (Start November)',
    },
}

export const GLOBAL = 'GLOBAL'
export const DEFAULT = 'DEFAULT'
