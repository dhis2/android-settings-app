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
export const SMS_TO_SEND = 'numberSmsToSend'
export const SMS_CONFIRMATION = 'numberSmsConfirmation'

export const generalSettings = {
    metadata: {
        syncType: 'metadataSync',
        label: 'How often should metadata sync?',
        options: metadataOptions,
        helpText: '',
    },
    data: {
        syncType: 'dataSync',
        label: 'How often should data sync?',
        options: dataOptions,
        helpText: '',
    },
    smsToSend: {
        syncType: 'numberSmsToSend',
        label: 'SMS Gateway phone number',
        options: '',
        helpText: 'Must start with + and be at least 4 characters long.',
        validationText:
            'This phone number is not valid. Must start with + and be at least 4 characters long.',
    },
    smsConfirmation: {
        syncType: 'numberSmsConfirmation',
        label: 'SMS Result Sender phone number',
        options: '',
        helpText: 'Must start with + and be at least 4 characters long.',
        validationText:
            'This phone number is not valid. Must start with + and be at least 4 characters long.',
    },
    reservedValues: {
        syncType: 'reservedValues',
        label: 'Reserved values downloaded per TEI attribute',
        options: '',
        helpText: '',
        maxValues: maxValues.reservedValues,
    },
    encryptDB: {
        syncType: 'encryptDB',
        label: 'Encrypt device database',
        options: '',
        helpText:
            'Encrypt all data stored on device. Data can be lost if there are problems with an encrypted database. This will not affect the DHIS2 database stored on an external server.',
    },
    disableSettings: {
        syncType: 'disableSettings',
        label: 'Disable all settings',
        options: '',
        helpText:
            'This will disable and remove all General, Program and Data set settings.',
    },
}
