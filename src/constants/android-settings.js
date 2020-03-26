import i18n from '@dhis2/d2-i18n'

export const metadataOptions = [
    {
        value: '24h',
        label: '24h',
    },
    {
        value: '7d',
        label: '7d',
    },
]

export const dataOptions = [
    {
        value: '30m',
        label: '30m',
    },
    {
        value: '1h',
        label: '1h',
    },
    {
        value: '6h',
        label: '6h',
    },
    {
        value: '12h',
        label: '12h',
    },
    {
        value: '24h',
        label: '24h',
    },
]

export const maxValues = {
    reservedValues: 50,
}

export const encryptTitles = {
    encrypt: i18n.t('Encrypt'),
    decrypt: i18n.t('Decrypt'),
}

export const androidSettingsDefault = {
    metadataSync: '24h',
    dataSync: '24h',
    numberSmsToSend: null,
    numberSmsConfirmation: null,
    reservedValues: 0,
    encryptDB: false,
}
