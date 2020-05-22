import React, { useState } from 'react'

import { Sidebar } from '@dhis2/d2-ui-core'
import { Link, useLocation } from 'react-router-dom'
import menuSection from '../constants/menu-sections'
import layoutStyles from '../styles/Layout.module.css'

const SideBar = () => {
    const location = useLocation()

    const sectionForPath = menuSection.find(
        section => section.path === location.pathname
    )

    const newSectionKey = sectionForPath ? sectionForPath.key : null
    const [currentSectionKey, setCurrentSectionKey] = useState(newSectionKey)

    if (newSectionKey !== currentSectionKey) {
        setCurrentSectionKey(newSectionKey)
    }

    const changeSectionHandler = key => {
        const section = menuSection.find(section => section.key === key)
        setCurrentSectionKey(section.key)
    }

    return (
        <div className={layoutStyles.paper__twoPanel__sideBar}>
            <Sidebar
                sections={menuSection.map(({ key, label, path, icon }) => ({
                    key,
                    label,
                    icon,
                    containerElement: <Link to={path}> {label} </Link>,
                }))}
                onChangeSection={changeSectionHandler}
                currentSection={currentSectionKey}
            />
        </div>
    )
}

export default SideBar
