import i18n from '@dhis2/d2-i18n'

export const Program = [
    {
        keyDownload: 'settingDownload',
        keyDBTrimming: 'settingDBTrimming',
        option: i18n.t('Setting for'),
        download: [
            {
                label: i18n.t('Global'),
                value: 'Global',
            },
            {
                label: i18n.t('Per Org Unit'),
                value: 'Per Org Unit',
            },
            {
                label: i18n.t('Per program'),
                value: 'Per program',
            },
            {
                label: i18n.t('Per OU and program'),
                value: 'Per OU and program',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('Global'),
                value: 'Global',
            },
            {
                label: i18n.t('Per Org Unit'),
                value: 'Per Org Unit',
            },
            {
                label: i18n.t('Per program'),
                value: 'Per program',
            },
            {
                label: i18n.t('Per OU and program'),
                value: 'Per OU and program',
            },
        ],
    },
    {
        keyDownload: 'teiDownload',
        keyDBTrimming: 'teiDBTrimmming',
        option: i18n.t('TEI'),
        maxValue: 2000,
    },
    {
        keyDownload: 'enrollmentDownload',
        keyDBTrimming: 'enrollmentDBTrimming',
        option: i18n.t('TEI Enrollments'),
        download: [
            {
                label: i18n.t('All'),
                value: 'All',
            },
            {
                label: i18n.t('Only Active'),
                value: 'Only Active',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('All'),
                value: 'All',
            },
            {
                label: i18n.t('Only Active'),
                value: 'Only Active',
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
    {
        keyDownload: 'updateDownload',
        keyDBTrimming: 'updateDBTrimming',
        option: i18n.t('TEI last update'),
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
        keyDownload: 'eventPeriodDownload',
        keyDBTrimming: 'eventPeriodDBTrimming',
        option: i18n.t('Event period'),
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

export const SpecificProgram = [
    {
        keyDownload: 'specificSettingDownload',
        keyDBTrimming: 'specificSettingDBTrimming',
        option: i18n.t('Setting for'),
        download: [
            {
                label: i18n.t('All Org Units'),
                value: 'All Org Units',
            },
            {
                label: i18n.t('Per Org Unit'),
                value: 'Per Org Unit',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('All Org Units'),
                value: 'All Org Units',
            },
            {
                label: i18n.t('Per Org Unit'),
                value: 'Per Org Unit',
            },
        ],
    },
    {
        option: i18n.t('TEI per program'),
        keyDownload: 'specificTeiDownload',
        keyDBTrimming: 'specificTeiDBTrimming',
        maxValue: 2000,
    },
    {
        keyDownload: 'specificEnrollmentDownload',
        keyDBTrimming: 'specificEnrollmentDBTrimming',
        option: i18n.t('TEI Enrollments'),
        download: [
            {
                label: i18n.t('All'),
                value: 'All',
            },
            {
                label: i18n.t('Only Active'),
                value: 'Only Active',
            },
        ],
        DBTrimming: [
            {
                label: i18n.t('All'),
                value: 'All',
            },
            {
                label: i18n.t('Only Active'),
                value: 'Only Active',
            },
        ],
    },
    {
        keyDownload: 'specificEnrollmentDateDownload',
        keyDBTrimming: 'specificEnrollmentDateDBTrimming',
        option: i18n.t('TEI Enrollment date'),
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
    {
        keyDownload: 'specificUpdateDownload',
        keyDBTrimming: 'specificUpdateDBTrimming',
        option: i18n.t('TEI last update'),
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
    {
        option: i18n.t('TE reserved values'),
        keyDownload: 'specificTEReservedDownload',
        keyDBTrimming: 'specificTEReservedDBTrimming',
        maxValue: 1500,
    },
    {
        option: i18n.t('Events'),
        keyDownload: 'specificEventsDownload',
        keyDBTrimming: 'specificEventsDBTrimming',
        maxValue: 3000,
    },
    {
        keyDownload: 'specificEventPeriodDownload',
        keyDBTrimming: 'specificEventPeriodDBTrimming',
        option: i18n.t('Event period'),
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

export const maxValues = {
    teiDownload: 2000,
    teiDBTrimmming: 2000,
    teReservedDownload: 1500,
    teReservedDBTrimming: 1500,
    eventsDownload: 3000,
    eventsDBTrimming: 3000,
    specificTeiDownload: 2000,
    specificTeiDBTrimming: 2000,
    specificTEReservedDownload: 1500,
    specificTEReservedDBTrimming: 1500,
    specificEventsDownload: 3000,
    specificEventsDBTrimming: 3000,
}

export const ProgramSettingsDefault = {
    settingDownload: 'Global',
    settingDBTrimming: 'Global',
    teiDownload: 500,
    teiDBTrimmming: 500,
    enrollmentDownload: 'All',
    enrollmentDBTrimming: 'All',
    enrollmentDateDownload: 'Any',
    enrollmentDateDBTrimming: 'Any',
    updateDownload: 'Any',
    updateDBTrimming: 'Any',
    teReservedDownload: 100,
    teReservedDBTrimming: 100,
    eventsDownload: 1000,
    eventsDBTrimming: 1000,
    eventPeriodDownload: 'Any',
    eventPeriodDBTrimming: 'Any',
}
