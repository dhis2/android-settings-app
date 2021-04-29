import i18n from '@dhis2/d2-i18n'
const FILTER = 'filter'
const SORT = 'sort'

export const programAppearanceSettings = [
    {
        key: 'assignedToMe',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Assigned to me'),
    },
    {
        key: 'enrollmentDate',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Enrollment Date'),
    },
    {
        key: 'enrollmentStatus',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Enrollment status'),
    },
    {
        key: 'eventDate',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Event Date'),
    },
    {
        key: 'eventStatus',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Event status'),
    },
    {
        key: 'organisationUnit',
        organisationUnit: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Organisation Unit'),
    },
    {
        key: 'syncStatus',
        syncStatus: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Sync status'),
    },
]

export const programAppearanceSpecificSettings = [
    {
        key: 'categoryCombo',
        syncStatus: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Category Combo'),
    },
    {
        key: 'assignedToMe',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Assigned to me'),
    },
    {
        key: 'enrollmentDate',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Enrollment Date'),
    },
    {
        key: 'enrollmentStatus',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Enrollment status'),
    },
    {
        key: 'eventDate',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Event Date'),
    },
    {
        key: 'eventStatus',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Event status'),
    },
    {
        key: 'organisationUnit',
        organisationUnit: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Organisation Unit'),
    },
    {
        key: 'syncStatus',
        syncStatus: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Sync status'),
    },
]
