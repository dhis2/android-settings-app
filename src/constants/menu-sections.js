import React from 'react'
import {
    AndroidSettingsIcon,
    ProgramsIcon,
    DataSetIcon,
    TestRun,
} from '../components/icons-svg'

const menuSection = [
    {
        key: 'android-setting',
        label: 'Android',
        path: '/android-setting',
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
        key: 'test-android-login',
        label: 'Test Android Login ',
        path: '/test-android-login',
        icon: <TestRun />,
    },
]

export default menuSection
