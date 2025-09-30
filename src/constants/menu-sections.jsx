import i18n from '@dhis2/d2-i18n'
import React from 'react'
import DatasetAnalytics from '../pages/Analytics/Dataset/DatasetAnalytics.jsx'
import HomeAnalytics from '../pages/Analytics/Home/HomeAnalytics.jsx'
import ProgramAnalytics from '../pages/Analytics/Program/ProgramAnalytics.jsx'
import AnalyticsTEI from '../pages/Analytics/TEI/AnalyticsTEI.jsx'
import DatasetsAppearance from '../pages/Appearance/Datasets/DatasetsAppearance.jsx'
import HomeAppearance from '../pages/Appearance/Home/HomeAppearance.jsx'
import ProgramsAppearance from '../pages/Appearance/Programs/ProgramsAppearance.jsx'
import GeneralSettings from '../pages/General/GeneralSettings.jsx'
import Home from '../pages/Home/Home.jsx'
import CustomIntents from '../pages/Intents/CustomIntents.jsx'
import DatasetSyncSettings from '../pages/Synchronization/Datasets/DatasetSyncSettings.jsx'
import GlobalSettings from '../pages/Synchronization/Global/GlobalSettings.jsx'
import ProgramSyncSettings from '../pages/Synchronization/Programs/ProgramSyncSettings.jsx'
import UserSyncTest from '../pages/Synchronization/UserSyncTest/UserSyncTest.jsx'

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
        component: <ProgramSyncSettings />,
        linkText: i18n.t('Set Programs sync settings'),
        description: i18n.t(
            'Define synchronization parameters to tracker and event programs'
        ),
    },
    {
        code: 'dataset-setting',
        label: i18n.t('Data sets'),
        path: '/sync/dataset-setting',
        component: <DatasetSyncSettings />,
        linkText: i18n.t('Set Data set sync settings'),
        description: i18n.t('Define synchronization parameters for data sets'),
    },
    {
        code: 'user-sync-test',
        label: i18n.t('User sync test'),
        path: '/sync/user-sync-test',
        component: <UserSyncTest />,
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
        component: <HomeAppearance />,
    },
    {
        code: 'program-appearance',
        label: i18n.t('Program'),
        path: '/appearance/program',
        linkText: i18n.t('Set Filters in Programs'),
        description: i18n.t('Manage Programs'),
        component: <ProgramsAppearance />,
    },
    {
        code: 'dataset-appearance',
        label: i18n.t('Data set'),
        path: '/appearance/dataset',
        linkText: i18n.t('Set Filters in Data sets'),
        description: i18n.t('Manage Data sets'),
        component: <DatasetsAppearance />,
    },
]

export const analyticsSection = i18n.t('Analytics')
export const analyticsPages = [
    {
        code: 'tei-analytics',
        label: i18n.t('TEI'),
        path: '/analytics/TEI',
        linkText: i18n.t('Set TEI Analytics'),
        description: i18n.t('Manage TEI analytics for tracker programs'),
        component: <AnalyticsTEI />,
    },
    {
        code: 'home-analytics',
        label: i18n.t('Home'),
        path: '/analytics/home',
        linkText: i18n.t('Set Home Visualizations'),
        description: i18n.t('Manage visualizations to be shown in home screen'),
        component: <HomeAnalytics />,
    },
    {
        code: 'program-analytics',
        label: i18n.t('Program'),
        path: '/analytics/program',
        linkText: i18n.t('Set Programs Visualizations'),
        description: i18n.t('Manage visualizations for programs'),
        component: <ProgramAnalytics />,
    },
    {
        code: 'dataset-analytics',
        label: i18n.t('Data set'),
        path: '/analytics/dataset',
        linkText: i18n.t('Set Data set Visualizations'),
        description: i18n.t('Manage visualizations for data sets'),
        component: <DatasetAnalytics />,
    },
]

export const customIntentsPage = {
    code: 'custom-intents',
    label: i18n.t('Custom Intents'),
    path: '/custom-intents',
    linkText: i18n.t('Set Intents'),
    description: i18n.t('Define actions triggered from external sources'),
    component: <CustomIntents />,
}

export const menuSection = [
    overviewPage,
    generalPage,
    ...syncPages,
    ...appearancePages,
    ...analyticsPages,
    customIntentsPage,
]
