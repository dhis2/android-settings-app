import i18n from '@dhis2/d2-i18n'
const FILTER = 'filter'
const SORT = 'sort'

export const homeScreenRowSettings = [
    {
        key: 'date',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Date'),
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
    {
        key: 'assignedToMe',
        assignedToMe: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Assigned to me'),
    },
]
