import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { MANUAL, SyncSelect } from './SyncSelect.jsx'

export const defaultMetadataSync = '24h'

const CODE = 'metadataSync'
export const metadataOptions = [
    {
        value: defaultMetadataSync,
        label: i18n.t('1 Day'),
    },
    {
        value: 'EVERY_6_HOURS',
        label: i18n.t('6 hours'),
        minApiVersion: 43,
    },
    {
        value: 'EVERY_12_HOURS',
        label: i18n.t('12 hours'),
        minApiVersion: 43,
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

export const MetadataSync = ({ value, onChange, ...props }) => {
    const { apiVersion } = useConfig()
    const options = metadataOptions
        .filter((option) => {
            if (option.minApiVersion && apiVersion < option.minApiVersion) {
                return false
            }
            return true
        })
        .map((option) => ({
            label: option.label,
            value: option.value,
        }))

    return (
        <SyncSelect
            name={CODE}
            label={i18n.t('How often should metadata sync?')}
            selected={value[CODE]}
            onChange={onChange}
            options={options}
            settings={value}
            {...props}
        />
    )
}

MetadataSync.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
