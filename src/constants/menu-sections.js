import React from 'react'
import {
    AndroidSettingsIcon,
    ProgramsIcon,
    DataSetIcon,
    TestRun,
} from '../components/icons-svg'
import i18n from '@dhis2/d2-i18n'

const menuSection = [
    {
        key: 'general-setting',
        label: i18n.t('General Settings'),
        path: '/general-setting',
        icon: <AndroidSettingsIcon />,
    },
    {
        key: 'program-setting',
        label: i18n.t('Programs'),
        path: '/program-setting',
        icon: <ProgramsIcon />,
    },
    {
        key: 'dataset-setting',
        label: i18n.t('Data Sets'),
        path: '/dataset-setting',
        icon: <DataSetIcon />,
    },
    {
        key: 'test-android-sync',
        label: i18n.t('Test Android Sync'),
        path: '/test-android-sync',
        icon: <TestRun />,
    },
]

export default menuSection
