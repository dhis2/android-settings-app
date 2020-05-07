import React from 'react'
import {
    AndroidSettingsIcon,
    ProgramsIcon,
    DataSetIcon,
    TestRun,
} from '../components/icons-svg'
import AndroidSettingsContainer from '../components/sections/general/android-settings-container'
import ProgramSettings from '../components/sections/program/program-settings'
import DataSetSettings from '../components/sections/dataset/dataSet-settings'
import UserSyncTestContainer from '../components/sections/user-sync-test/user-sync-test-container'

import i18n from '@dhis2/d2-i18n'

const menuSection = [
    {
        key: 'general-setting',
        label: i18n.t('General'),
        path: '/general-setting',
        icon: <AndroidSettingsIcon />,
        component: <AndroidSettingsContainer />,
    },
    {
        key: 'program-setting',
        label: i18n.t('Programs'),
        path: '/program-setting',
        icon: <ProgramsIcon />,
        component: <ProgramSettings />,
    },
    {
        key: 'dataset-setting',
        label: i18n.t('Data Sets'),
        path: '/dataset-setting',
        icon: <DataSetIcon />,
        component: <DataSetSettings />,
    },
    {
        key: 'user-sync-test',
        label: i18n.t('User sync test'),
        path: '/user-sync-test',
        icon: <TestRun />,
        component: <UserSyncTestContainer />,
    },
]

export default menuSection
