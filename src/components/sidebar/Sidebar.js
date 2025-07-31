import { Menu } from '@dhis2/ui'
import React from 'react'
import { useLocation } from 'react-router-dom'
import {
    analyticsPages,
    analyticsSection,
    appearancePages,
    appearanceSection,
    customIntentsPage,
    generalPage,
    overviewPage,
    syncPages,
    syncSection,
} from '../../constants/menu-sections'
import MenuItem from './MenuItem'
import MenuSectionHeader from './MenuSectionHeader'

const SideBar = () => {
    const location = useLocation()
    const pathname = location.pathname

    return (
        <Menu>
            <MenuItem
                label={overviewPage.label}
                path={overviewPage.path}
                code={overviewPage.code}
                active={pathname === overviewPage.path}
                isHeader={true}
            />

            <MenuItem
                label={generalPage.label}
                path={generalPage.path}
                code={generalPage.code}
                active={pathname === generalPage.path}
                isHeader={true}
            />

            <MenuSectionHeader label={syncSection} />
            {syncPages.map(({ code, label, path }) => {
                const active = pathname === path
                return (
                    <MenuItem
                        key={code}
                        code={code}
                        label={label}
                        path={path}
                        active={active}
                    />
                )
            })}

            <MenuSectionHeader label={appearanceSection} />
            {appearancePages.map(({ code, label, path }) => {
                const active = pathname === path
                return (
                    <MenuItem
                        key={code}
                        code={code}
                        label={label}
                        path={path}
                        active={active}
                    />
                )
            })}

            <MenuSectionHeader label={analyticsSection} />
            {analyticsPages.map(({ code, label, path }) => {
                const active = pathname === path
                return (
                    <MenuItem
                        key={code}
                        code={code}
                        label={label}
                        path={path}
                        active={active}
                    />
                )
            })}

            <MenuItem
                label={customIntentsPage.label}
                path={customIntentsPage.path}
                code={customIntentsPage.code}
                active={pathname === customIntentsPage.path}
                isHeader={true}
            />
        </Menu>
    )
}

export default SideBar
