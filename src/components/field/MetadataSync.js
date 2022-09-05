import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { MANUAL, SyncSelect } from './SyncSelect'

export const defaultMetadataSync = '24h'

const CODE = 'metadataSync'
const metadataOptions = [
    {
        value: defaultMetadataSync,
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

export const MetadataSync = ({ value, onChange, ...props }) => (
    <SyncSelect
        name={CODE}
        label={i18n.t('How often should metadata sync?')}
        selected={value[CODE]}
        onChange={onChange}
        options={metadataOptions}
        settings={value}
        {...props}
    />
)

MetadataSync.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
