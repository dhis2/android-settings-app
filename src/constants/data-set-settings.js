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
    },
    Weekly: {
        type: 'Weekly',
        default: 12,
    },
    WeeklyWednesday: {
        type: 'WeeklyWednesday',
        default: 12,
    },
    WeeklyThursday: {
        type: 'WeeklyThursday',
        default: 12,
    },
    WeeklySaturday: {
        type: 'WeeklySaturday',
        default: 12,
    },
    WeeklySunday: {
        type: 'WeeklySunday',
        default: 12,
    },
    BiWeekly: {
        type: 'BiWeekly',
        default: 12,
    },
    Monthly: {
        type: 'Monthly',
        default: 11,
    },
    BiMonthly: {
        type: 'BiMonthly',
        default: 5,
    },
    Quarterly: {
        type: 'Quarterly',
        default: 4,
    },
    SixMonthly: {
        type: 'SixMonthly',
        default: 4,
    },
    SixMonthlyApril: {
        type: 'SixMonthlyApril',
        default: 4,
    },
    SixMonthlyNov: {
        type: 'SixMonthlyNov',
        default: 4,
    },
    Yearly: {
        type: 'Yearly',
        default: 4,
    },
    FinancialApril: {
        type: 'FinancialApril',
        default: 4,
    },
    FinancialJuly: {
        type: 'FinancialJuly',
        default: 4,
    },
    FinancialOct: {
        type: 'FinancialOct',
        default: 4,
    },
    FinancialNov: {
        type: 'FinancialNov',
        default: 4,
    },
}

export const DataSetTitles = {
    typeName: 'Data Set Name',
    type: 'Data Set',
    typePlural: 'Data Sets',
    typeLowercase: 'data set',
}

export const SPECIFIC = 'SPECIFIC'
export const GLOBAL = 'GLOBAL'
export const DEFAULT = 'DEFAULT'
export const CLEAN = 'CLEAN'
export const SPECIFIC_SETTINGS = 'SPECIFIC_SETTINGS'

export const PERIOD_DS_DOWNLOAD = 'periodDSDownload'
export const PERIOD_DS_DB_TRIMMING = 'periodDSDBTrimming'

export const DATA_SET = 'DATA_SET'
