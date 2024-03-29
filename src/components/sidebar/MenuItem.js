import { MenuItem as UIMenuItem } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Sidebar.module.css'

const MenuItem = ({ label, path, code, active, isHeader }) => {
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
                [styles.sidebarHeader]: isHeader,
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
    isHeader: PropTypes.bool,
}

export default MenuItem
