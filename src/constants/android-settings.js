import i18n from '@dhis2/d2-i18n'

export const RESERVED_VALUES = 'reservedValues'
export const MANUAL = 'manual'
export const SMS_TO_SEND = 'numberSmsToSend'
export const SMS_CONFIRMATION = 'numberSmsConfirmation'
export const METADATA_SYNC = 'metadataSync'
export const METADATA = 'metadata'
export const DATA = 'data'

export const metadataOptions = [
    {
        value: '24h',
        label: i18n.t('1 Day'),
    },
    {
        value: '7d',
        label: i18n.t('1 Week'),
    },
    {
        value: MANUAL,
        label: i18n.t('Manual'),
    },
]

export const dataOptions = [
    {
        value: '30m',
        label: i18n.t('30 Minutes'),
    },
    {
        value: '1h',
        label: i18n.t('1 Hour'),
    },
    {
        value: '6h',
        label: i18n.t('6 Hours'),
    },
    {
        value: '12h',
        label: i18n.t('12 Hours'),
    },
    {
        value: '24h',
        label: i18n.t('1 Day'),
    },
    {
        value: MANUAL,
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

export const generalSettingsFormSections = {
    metadata: {
        syncType: 'metadataSync',
        label: i18n.t('How often should metadata sync?'),
        options: metadataOptions,
        helpText: '',
    },
    data: {
        syncType: 'dataSync',
        label: i18n.t('How often should data sync?'),
        options: dataOptions,
        helpText: '',
    },
    smsToSend: {
        syncType: 'numberSmsToSend',
        label: i18n.t('SMS Gateway phone number'),
        options: '',
        helpText: i18n.t(
            'Must start with + and be at least 4 characters long.'
        ),
        validationText: i18n.t(
            'This phone number is not valid. Must start with + and be at least 4 characters long.'
        ),
    },
    smsConfirmation: {
        syncType: 'numberSmsConfirmation',
        label: i18n.t('SMS Result Sender phone number'),
        options: '',
        helpText: i18n.t(
            'Must start with + and be at least 4 characters long.'
        ),
        validationText: i18n.t(
            'This phone number is not valid. Must start with + and be at least 4 characters long.'
        ),
    },
    reservedValues: {
        syncType: 'reservedValues',
        label: i18n.t('Reserved values downloaded per TEI attribute'),
        options: '',
        helpText: '',
        maxValues: maxValues.reservedValues,
    },
    encryptDB: {
        syncType: 'encryptDB',
        label: i18n.t('Encrypt device database'),
        options: '',
        helpText: i18n.t(
            'Encrypt all data stored on device. Data can be lost if there are problems with an encrypted database. This will not affect the DHIS2 database stored on an external server.'
        ),
    },
    disableSettings: {
        syncType: 'disableSettings',
        label: i18n.t('Disable all settings'),
        options: '',
        helpText: i18n.t(
            'This will disable and remove all General, Program and Data set settings.'
        ),
    },
}
