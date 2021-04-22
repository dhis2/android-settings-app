import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { MANUAL, SyncSelect } from './SyncSelect'

const CODE = 'dataSync'
const dataOptions = [
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

export const defaultDataSync = '24h'

export const DataSync = ({ value, onChange, ...props }) => (
    <SyncSelect
        name={CODE}
        label={i18n.t('How often should data sync?')}
        selected={value[CODE]}
        options={dataOptions}
        onChange={onChange}
        settings={value}
        {...props}
    />
)

DataSync.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
