import i18n from '@dhis2/d2-i18n'

export const DATA_VISUALIZATION = 'VISUALIZATION'
export const EVENT_VISUALIZATION = 'TRACKER_VISUALIZATION'

export const visualizationTypes = [
    {
        value: DATA_VISUALIZATION,
        label: i18n.t('Data Visualization'),
    },
    {
        value: EVENT_VISUALIZATION,
        label: i18n.t('Event Visualization'),
    },
]
