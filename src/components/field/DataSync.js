import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { MANUAL, SyncSelect } from './SyncSelect'

export const defaultDataSync = '24h'

const CODE = 'dataSync'
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
        value: defaultDataSync,
        label: i18n.t('1 Day'),
    },
    {
        value: MANUAL,
        label: i18n.t('Manual'),
    },
]

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
