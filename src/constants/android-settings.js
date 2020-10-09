import i18n from '@dhis2/d2-i18n'

export const metadataOptions = [
    {
        value: '24h',
        label: '1 Day',
    },
    {
        value: '7d',
        label: '1 Week',
    },
    {
        value: 'manual',
        label: i18n.t('Manual'),
    },
]

export const dataOptions = [
    {
        value: '30m',
        label: '30 Minutes',
    },
    {
        value: '1h',
        label: '1 Hour',
    },
    {
        value: '6h',
        label: '6 Hours',
    },
    {
        value: '12h',
        label: '12 Hours',
    },
    {
        value: '24h',
        label: '1 Day',
    },
    {
        value: 'manual',
        label: i18n.t('Manual'),
    },
]

export const maxValues = {
    reservedValues: 500,
}

export const encryptTitles = {
    encrypt: i18n.t('Encrypt'),
    decrypt: i18n.t('Decrypt'),
}

export const androidSettingsDefault = {
    metadataSync: '24h',
    dataSync: '24h',
    reservedValues: 100,
    encryptDB: false,
}

export const RESERVED_VALUES = 'reservedValues'
export const manual = 'manual'
