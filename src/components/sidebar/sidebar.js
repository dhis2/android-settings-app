import React from 'react'
import { useLocation } from 'react-router-dom'
import { Menu } from '@dhis2/ui'
import MenuItem from './menu-item'
import MenuSectionHeader from './menu-section-header'
import {
    analyticsPage,
    appearancePages,
    appearanceSection,
    generalPage,
    overviewPage,
    syncPages,
    syncSection,
} from '../../constants/menu-sections'

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

            <MenuItem
                label={analyticsPage.label}
                path={analyticsPage.path}
                code={analyticsPage.code}
                active={pathname === analyticsPage.path}
                isHeader={true}
            />
        </Menu>
    )
}

export default SideBar
