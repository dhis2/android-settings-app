import React from 'react'
import {
    AndroidSettingsIcon,
    ProgramsIcon,
    DataSetIcon,
    TestRun,
} from '../components/icons-svg'

const menuSection = [
    {
        key: 'general-setting',
        label: 'General Setting',
        path: '/general-setting',
        icon: <AndroidSettingsIcon />,
    },
    {
        key: 'program-setting',
        label: 'Programs',
        path: '/program-setting',
        icon: <ProgramsIcon />,
    },
    {
        key: 'dataset-setting',
        label: 'Data Sets',
        path: '/dataset-setting',
        icon: <DataSetIcon />,
    },
    {
        key: 'test-android-sync',
        label: 'Test Android Sync ',
        path: '/test-android-sync',
        icon: <TestRun />,
    },
]

export default menuSection
