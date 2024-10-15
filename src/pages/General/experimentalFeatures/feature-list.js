import i18n from '@dhis2/d2-i18n'

export const featureList = [
    {
        name: 'newFormLayout',
        label: i18n.t('New Data Entry Form'),
        description: i18n.t(
            'Enable/Disable the new data entry form with new inputs per value type. The inputs for all value types have been redesigned, with a improved selection mode and increased tappable areas and texts.'
        ),
        warning: i18n.t(
            'Only applicable for users using Android app versions 2.9, 2.9.1, and 2.9.2.'
        ),
        version: i18n.t('2.9.x'),
    },
]
