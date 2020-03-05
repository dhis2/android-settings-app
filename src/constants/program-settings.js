import i18n from '@dhis2/d2-i18n'

export const Program = [
    {
        keyDownload: 'settingDownload',
        keyDBTrimming: 'settingDBTrimming',
        option: i18n.t('Setting for'),
        download: [
            {
                label: i18n.t('Global'),
                value: 'GLOBAL',
            },
            {
                label: i18n.t('Per Org Unit'),
                value: 'PER_ORG_UNIT',
            },
            {
                label: i18n.t('Per program'),
                value: 'PER_PROGRAM',
            },
            {
                label: i18n.t('Per OU and program'),
                value: 'PER_OU_AND_PROGRAM',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('Global'),
                value: 'GLOBAL',
            },
            {
                label: i18n.t('Per Org Unit'),
                value: 'PER_ORG_UNIT',
            },
            {
                label: i18n.t('Per program'),
                value: 'PER_PROGRAM',
            },
            {
                label: i18n.t('Per OU and program'),
                value: 'PER_OU_AND_PROGRAM',
            },
        ],
    },
    {
        keyDownload: 'teiDownload',
        keyDBTrimming: 'teiDBTrimming',
        option: i18n.t('TEIs'),
        maxValue: 2000,
    },
    {
        keyDownload: 'enrollmentDownload',
        keyDBTrimming: 'enrollmentDBTrimming',
        option: i18n.t('TEI Enrollment status'),
        download: [
            {
                label: i18n.t('All'),
                value: 'ALL',
            },
            {
                label: i18n.t('Only Active'),
                value: 'ONLY_ACTIVE',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('All'),
                value: 'ALL',
            },
            {
                label: i18n.t('Only Active'),
                value: 'ONLY_ACTIVE',
            },
        ],
    },
    {
        keyDownload: 'enrollmentDateDownload',
        keyDBTrimming: 'enrollmentDateDBTrimming',
        option: i18n.t('TEI Enrollment date'),
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
                label: i18n.t('Last 12 months'),
                value: 'LAST_12_MONTHS',
            },
        ],
    },
    {
        keyDownload: 'updateDownload',
        keyDBTrimming: 'updateDBTrimming',
        option: i18n.t('TEI last update'),
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
                label: i18n.t('Last 12 months'),
                value: 'LAST_12_MONTHS',
            },
        ],
    },
    {
        option: i18n.t('TE reserved values'),
        keyDownload: 'teReservedDownload',
        keyDBTrimming: 'teReservedDBTrimming',
        maxValue: 1500,
    },
    {
        option: i18n.t('Events'),
        keyDownload: 'eventsDownload',
        keyDBTrimming: 'eventsDBTrimming',
        maxValue: 3000,
    },
    {
        keyDownload: 'eventDateDownload',
        keyDBTrimming: 'eventDateDBTrimming',
        option: i18n.t('Event date'),
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
                label: i18n.t('Last 12 months'),
                value: 'LAST_12_MONTHS',
            },
        ],
    },
]

export const SpecificProgram = [
    {
        keyDownload: 'settingDownload',
        keyDBTrimming: 'settingDBTrimming',
        option: i18n.t('Setting for'),
        download: [
            {
                label: i18n.t('All Org Units'),
                value: 'ALL_ORG_UNITS',
            },
            {
                label: i18n.t('Per Org Unit'),
                value: 'PER_ORG_UNIT',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('All Org Units'),
                value: 'ALL_ORG_UNITS',
            },
            {
                label: i18n.t('Per Org Unit'),
                value: 'PER_ORG_UNIT',
            },
        ],
    },
    {
        option: i18n.t('TEI per program'),
        keyDownload: 'teiDownload',
        keyDBTrimming: 'teiDBTrimming',
        maxValue: 2000,
    },
    {
        keyDownload: 'enrollmentDownload',
        keyDBTrimming: 'enrollmentDBTrimming',
        option: i18n.t('TEI Enrollment status'),
        download: [
            {
                label: i18n.t('All'),
                value: 'ALL',
            },
            {
                label: i18n.t('Only Active'),
                value: 'ONLY_ACTIVE',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('All'),
                value: 'ALL',
            },
            {
                label: i18n.t('Only Active'),
                value: 'ONLY_ACTIVE',
            },
        ],
    },
    {
        keyDownload: 'enrollmentDateDownload',
        keyDBTrimming: 'enrollmentDateDBTrimming',
        option: i18n.t('TEI Enrollment date'),
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
                label: i18n.t('Last 12 months'),
                value: 'LAST_12_MONTHS',
            },
        ],
    },
    {
        keyDownload: 'updateDownload',
        keyDBTrimming: 'updateDBTrimming',
        option: i18n.t('TEI last update'),
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
                label: i18n.t('Last 12 months'),
                value: 'LAST_12_MONTHS',
            },
        ],
    },
    {
        option: i18n.t('TE reserved values'),
        keyDownload: 'teReservedDownload',
        keyDBTrimming: 'teReservedDBTrimming',
        maxValue: 1500,
    },
    {
        option: i18n.t('Events'),
        keyDownload: 'eventsDownload',
        keyDBTrimming: 'eventsDBTrimming',
        maxValue: 3000,
    },
    {
        keyDownload: 'eventDateDownload',
        keyDBTrimming: 'eventDateDBTrimming',
        option: i18n.t('Event date'),
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
                label: i18n.t('Last 12 months'),
                value: 'LAST_12_MONTHS',
            },
        ],
    },
]

export const maxValues = {
    teiDownload: 2000,
    teiDBTrimming: 2000,
    teReservedDownload: 1500,
    teReservedDBTrimming: 1500,
    eventsDownload: 3000,
    eventsDBTrimming: 3000,
}

export const ProgramSettingsDefault = {
    settingDownload: 'GLOBAL',
    settingDBTrimming: 'GLOBAL',
    teiDownload: 500,
    teiDBTrimming: 500,
    enrollmentDownload: 'ALL',
    enrollmentDBTrimming: 'ALL',
    enrollmentDateDownload: 'ANY',
    enrollmentDateDBTrimming: 'ANY',
    updateDownload: 'ANY',
    updateDBTrimming: 'ANY',
    teReservedDownload: 100,
    teReservedDBTrimming: 100,
    eventsDownload: 1000,
    eventsDBTrimming: 1000,
    eventDateDownload: 'ANY',
    eventDateDBTrimming: 'ANY',
}
