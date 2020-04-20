import i18n from '@dhis2/d2-i18n'

export const GlobalSettingLevel = {
    keyDownload: 'settingDownload',
    keyDBTrimming: 'settingDBTrimming',
    option: i18n.t('Setting level'),
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
}

export const GlobalProgram = [
    {
        keyDownload: 'teiDownload',
        keyDBTrimming: 'teiDBTrimming',
        option: i18n.t('Maximum Tracked Entity Instance (TEI) downloads'),
        maxValue: 2000,
    },
    {
        keyDownload: 'enrollmentDownload',
        keyDBTrimming: 'enrollmentDBTrimming',
        option: i18n.t('Download TEI with status'),
        radioButton: true,
        download: [
            {
                label: i18n.t('All statuses'),
                value: 'ALL',
            },
            {
                label: i18n.t('Active Only'),
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
        option: i18n.t('Download TEI with enrollment date within'),
        download: [
            {
                label: i18n.t('Any ime period'),
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
        option: i18n.t('Download TEI that have been updated within'),
        download: [
            {
                label: i18n.t('Any time period'),
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
        option: i18n.t('Maximum Event downloads'),
        keyDownload: 'eventsDownload',
        keyDBTrimming: 'eventsDBTrimming',
        maxValue: 3000,
    },
    {
        keyDownload: 'eventDateDownload',
        keyDBTrimming: 'eventDateDBTrimming',
        option: i18n.t('Download Events with event date within'),
        download: [
            {
                label: i18n.t('Any time period'),
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

export const GlobalProgramSpecial = [...GlobalProgram]
GlobalProgramSpecial.splice(1, 2)

export const SpecificProgram = {
    withRegistration: [
        {
            keyDownload: 'settingDownload',
            keyDBTrimming: 'settingDBTrimming',
            option: i18n.t('Setting level'),
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
            option: i18n.t(
                'Maximum Tracked Entity Instance (TEI) download per program'
            ),
            keyDownload: 'teiDownload',
            keyDBTrimming: 'teiDBTrimming',
            maxValue: 2000,
        },
        {
            keyDownload: 'enrollmentDownload',
            keyDBTrimming: 'enrollmentDBTrimming',
            option: i18n.t('Download TEI with status'),
            download: [
                {
                    label: i18n.t('All statuses'),
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
            option: i18n.t('Download TEI with enrollment date within'),
            download: [
                {
                    label: i18n.t('Any time period'),
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
            option: i18n.t('Download TEI that have been updated within'),
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
    ],
    withoutRegistration: [
        {
            keyDownload: 'settingDownload',
            keyDBTrimming: 'settingDBTrimming',
            option: i18n.t('Setting level'),
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
            option: i18n.t('Maximum Event downloads'),
            keyDownload: 'eventsDownload',
            keyDBTrimming: 'eventsDBTrimming',
            maxValue: 3000,
        },
        {
            keyDownload: 'eventDateDownload',
            keyDBTrimming: 'eventDateDBTrimming',
            option: i18n.t('Download Events with event date within'),
            download: [
                {
                    label: i18n.t('Any time period'),
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
    ],
}

export const maxValues = {
    teiDownload: 2000,
    teiDBTrimming: 2000,
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
    eventsDownload: 1000,
    eventsDBTrimming: 1000,
    eventDateDownload: 'ANY',
    eventDateDBTrimming: 'ANY',
}

export const SpecificSettingsDefault = {
    settingDownload: 'ALL_ORG_UNITS',
    settingDBTrimming: 'ALL_ORG_UNITS',
    teiDownload: 500,
    teiDBTrimming: 500,
    enrollmentDownload: 'ALL',
    enrollmentDBTrimming: 'ALL',
    enrollmentDateDownload: 'ANY',
    enrollmentDateDBTrimming: 'ANY',
    updateDownload: 'ANY',
    updateDBTrimming: 'ANY',
    eventsDownload: 1000,
    eventsDBTrimming: 1000,
    eventDateDownload: 'ANY',
    eventDateDBTrimming: 'ANY',
}

export const GLOBAL = 'GLOBAL'
export const PER_ORG_UNIT = 'PER_ORG_UNIT'
export const WITH_REGISTRATION = 'WITH_REGISTRATION'
export const WITHOUT_REGISTRATION = 'WITHOUT_REGISTRATION'

export const FULL_SPECIFIC = 'FULL_SPECIFIC'
export const GLOBAL_SPECIAL = 'GLOBAL_SPECIAL'
export const DEFAULT = 'DEFAULT'

export const ProgramTitles = {
    typeName: 'Program Name',
    type: 'Program',
    typePlural: 'Programs',
    typeLowercase: 'program',
}

export const TEI_DOWNLOAD = 'teiDownload'
export const TEI_DB_TRIMMING = 'teiDBTrimming'
export const EVENTS_DOWNLOAD = 'eventsDownload'
export const EVENTS_DB_TRIMMING = 'eventsDBTrimming'
export const SETTING_DOWNLOAD = 'settingDownload'

export const ENROLLMENT_DOWNLOAD = 'enrollmentDownload'
