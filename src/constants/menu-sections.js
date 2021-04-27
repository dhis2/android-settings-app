import React from 'react'
import i18n from '@dhis2/d2-i18n'
import {
    AndroidSettingsIcon,
    ProgramsIcon,
    DataSetIcon,
    TestRun,
} from '../components/icons-svg'
import ProgramSettings from '../components/sections/program/program-settings'
import DataSetSettings from '../components/sections/dataset/dataSet-settings'
import UserSyncTestContainer from '../components/sections/user-sync-test/user-sync-test-container'
import Home from '../pages/Home/home'
import GeneralSettings from '../pages/General/GeneralSettings'
import GlobalSettings from '../pages/Synchronization/Global/GlobalSettings'
import AnalyticsTEI from '../pages/Analytics/AnalyticsTEI'

export const overviewPage = {
    code: 'home',
    label: i18n.t('Overview'),
    path: '/',
    component: <Home />,
}

export const generalPage = {
    code: 'general-settings',
    label: i18n.t('General'),
    path: '/general-settings',
    linkText: i18n.t('Set General settings'),
    description: i18n.t(
        'Defines generic parameters like SMS gateway number and TEI reserved values'
    ),
    component: <GeneralSettings />,
}

export const syncSection = i18n.t('Synchronization')

export const syncPages = [
    {
        code: 'global-settings',
        label: i18n.t('Global'),
        path: '/sync/global-settings',
        icon: <AndroidSettingsIcon />,
        component: <GlobalSettings />,
        linkText: i18n.t('Set Global sync settings'),
        description: i18n.t(
            'Set global settings like metadata anda data sync period'
        ),
    },
    {
        code: 'program-setting',
        label: i18n.t('Programs'),
        path: '/sync/program-setting',
        icon: <ProgramsIcon />,
        component: <ProgramSettings />,
        linkText: i18n.t('Set Programs sync settings'),
        description: i18n.t(
            'Define synchronization parameters to tracker and event programs'
        ),
    },
    {
        code: 'dataset-setting',
        label: i18n.t('Data Sets'),
        path: '/sync/dataset-setting',
        icon: <DataSetIcon />,
        component: <DataSetSettings />,
        linkText: i18n.t('Set Data set sync settings'),
        description: i18n.t('Define synchronization parameters for datasets'),
    },
    {
        code: 'user-sync-test',
        label: i18n.t('User sync test'),
        path: '/sync/user-sync-test',
        icon: <TestRun />,
        component: <UserSyncTestContainer />,
        linkText: i18n.t('Run user sync test'),
        description: i18n.t(
            'Check how much data a user downloads when syncing'
        ),
    },
]

export const appearanceSection = i18n.t('Appearance')

export const appearancePages = [
    {
        code: 'home-screen-appearance',
        label: i18n.t('Home screen'),
        path: '/appearance/home-screen',
        linkText: i18n.t('Set Filters in Home screen'),
        description: i18n.t('Manage Home screen'),
        component: <div> Home screen </div>,
    },
    {
        code: 'program-appearance',
        label: i18n.t('Program'),
        path: '/appearance/program',
        linkText: i18n.t('Set Filters in Programs'),
        description: i18n.t('Manage Programs'),
        component: <div> Program </div>,
    },
    {
        code: 'dataset-appearance',
        label: i18n.t('Data set'),
        path: '/appearance/dataset',
        linkText: i18n.t('Set Filters in Data sets'),
        description: i18n.t('Manage Data sets'),
        component: <div> Dataset </div>,
    },
]

export const analyticsPage = {
    code: 'analytics',
    label: i18n.t('Analytics'),
    path: '/analytics',
    linkText: i18n.t('Set TEI Analytics'),
    description: i18n.t('Manage TEI analytics for tracker programs'),
    component: <AnalyticsTEI />,
}

export const menuSection = [
    overviewPage,
    generalPage,
    ...syncPages,
    ...appearancePages,
    analyticsPage,
]

//TODO: replace div "component" with the real section/Page component
