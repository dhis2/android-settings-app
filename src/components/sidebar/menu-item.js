import React from 'react'
import { MenuItem as UIMenuItem } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import PropTypes from '@dhis2/prop-types'
import cx from 'classnames'
import styles from './Sidebar.module.css'

const MenuItem = ({ label, path, code, active }) => {
    const history = useHistory()
    const navigateToPath = () => history.push(path)

    return (
        <UIMenuItem
            active={active}
            onClick={navigateToPath}
            label={label}
            className={cx({
                [styles.sidebarItem]: !active,
                [styles.sidebarItemActive]: active,
            })}
            dataTest={`sidebar-link-${code}`}
        />
    )
}

MenuItem.propTypes = {
    label: PropTypes.string,
    path: PropTypes.string,
    code: PropTypes.string,
    active: PropTypes.bool,
}

export default MenuItem
