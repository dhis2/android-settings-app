export const Program = [
    {
        keyDownload: 'settingDownload',
        keyDBTrimming: 'settingDBTrimming',
        option: 'Setting for',
        download: [
            {
                label: 'Global',
                value: 'Global',
            },
            {
                label: 'Per Org Unit',
                value: 'Per Org Unit',
            },
            {
                label: 'Per program',
                value: 'Per program',
            },
            {
                label: 'Per OU and program',
                value: 'Per OU and program',
            },
        ],
        DBTrimming: [
            {
                label: 'Global',
                value: 'Global',
            },
            {
                label: 'Per Org Unit',
                value: 'Per Org Unit',
            },
            {
                label: 'Per program',
                value: 'Per program',
            },
            {
                label: 'Per OU and program',
                value: 'Per OU and program',
            },
        ],
    },
    {
        keyDownload: 'teiDownload',
        keyDBTrimming: 'teiDBTrimmming',
        option: 'TEI', // per program
        maxValue: 2000,
    },
    {
        keyDownload: 'enrollmentDownload',
        keyDBTrimming: 'enrollmentDBTrimming',
        option: 'TEI Enrollments',
        download: [
            {
                label: 'All',
                value: 'All',
            },
            {
                label: 'Only Active',
                value: 'Only Active',
            },
        ],
        DBTrimming: [
            {
                label: 'All',
                value: 'All',
            },
            {
                label: 'Only Active',
                value: 'Only Active',
            },
        ],
    },
    {
        keyDownload: 'enrollmentDateDownload',
        keyDBTrimming: 'enrollmentDateDBTrimming',
        option: 'TEI Enrollment date',
        download: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
                value: 'Last 12 months',
            },
        ],
        DBTrimming: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
                value: 'Last 12 months',
            },
        ],
    },
    {
        keyDownload: 'updateDownload',
        keyDBTrimming: 'updateDBTrimming',
        option: 'TEI last update',
        download: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
                value: 'Last 12 months',
            },
        ],
        DBTrimming: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
                value: 'Last 12 months',
            },
        ],
    },
    {
        option: 'TE reserved values',
        keyDownload: 'teReservedDownload',
        keyDBTrimming: 'teReservedDBTrimming',
        maxValue: 1500,
    },
    {
        option: 'Events',
        keyDownload: 'eventsDownload',
        keyDBTrimming: 'eventsDBTrimming',
        maxValue: 3000,
    },
    {
        keyDownload: 'eventPeriodDownload',
        keyDBTrimming: 'eventPeriodDBTrimming',
        option: 'Event period',
        download: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
                value: 'Last 12 months',
            },
        ],
        DBTrimming: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
                value: 'Last 12 months',
            },
        ],
    },
]

export const SpecificProgram = [
    {
        keyDownload: 'specificSettingDownload',
        keyDBTrimming: 'specificSettingDBTrimming',
        option: 'Setting for',
        download: [
            {
                label: 'All Org Units',
                value: 'All Org Units',
            },
            {
                label: 'Per Org Unit',
                value: 'Per Org Unit',
            },
        ],
        DBTrimming: [
            {
                label: 'All Org Units',
                value: 'All Org Units',
            },
            {
                label: 'Per Org Unit',
                value: 'Per Org Unit',
            },
        ],
    },
    {
        option: 'TEI per program',
        keyDownload: 'specificTeiDownload',
        keyDBTrimming: 'specificTeiDBTrimming',
        maxValue: 2000,
    },
    {
        keyDownload: 'specificEnrollmentDownload',
        keyDBTrimming: 'specificEnrollmentDBTrimming',
        option: 'TEI Enrollments',
        download: [
            {
                label: 'All',
                value: 'All',
            },
            {
                label: 'Only Active',
                value: 'Only Active',
            },
        ],
        DBTrimming: [
            {
                label: 'All',
                value: 'All',
            },
            {
                label: 'Only Active',
                value: 'Only Active',
            },
        ],
    },
    {
        keyDownload: 'specificEnrollmentDateDownload',
        keyDBTrimming: 'specificEnrollmentDateDBTrimming',
        option: 'TEI Enrollment date',
        download: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
                value: 'Last 12 months',
            },
        ],
        DBTrimming: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
                value: 'Last 12 months',
            },
        ],
    },
    {
        keyDownload: 'specificUpdateDownload',
        keyDBTrimming: 'specificUpdateDBTrimming',
        option: 'TEI last update',
        download: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
                value: 'Last 12 months',
            },
        ],
        DBTrimming: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
                value: 'Last 12 months',
            },
        ],
    },
    {
        option: 'TE reserved values',
        keyDownload: 'specificTEReservedDownload',
        keyDBTrimming: 'specificTEReservedDBTrimming',
        maxValue: 1500,
    },
    {
        option: 'Events',
        keyDownload: 'specificEventsDownload',
        keyDBTrimming: 'specificEventsDBTrimming',
        maxValue: 3000,
    },
    {
        keyDownload: 'specificEventPeriodDownload',
        keyDBTrimming: 'specificEventPeriodDBTrimming',
        option: 'Event period',
        download: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
                value: 'Last 12 months',
            },
        ],
        DBTrimming: [
            {
                label: 'Any',
                value: 'Any',
            },
            {
                label: 'Last month',
                value: 'Last month',
            },
            {
                label: 'Last 3 months',
                value: 'Last 3 months',
            },
            {
                label: 'Last 12 months',
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
