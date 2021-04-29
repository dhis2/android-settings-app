import i18n from '@dhis2/d2-i18n'
const FILTER = 'filter'
const SORT = 'sort'

export const datasetAppearanceSettings = [
    {
        key: 'period',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Period'),
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

export const datasetAppearanceSpecificSettings = [
    {
        key: 'categoryCombo',
        syncStatus: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Category Combo'),
    },
    {
        key: 'period',
        date: {
            filter: FILTER,
            sort: SORT,
        },
        label: i18n.t('Period'),
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
