import i18n from '@dhis2/d2-i18n'

export const METADATA_SYNC = 'metadataSync'
export const METADATA = 'metadata'
export const DATA = 'data'

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
