import { MenuSectionHeader as UIMenuHeader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Sidebar.module.css'

const MenuSectionHeader = ({ label }) => (
    <UIMenuHeader className={styles.sectionTitle} label={label} hideDivider />
)

MenuSectionHeader.propTypes = {
    label: PropTypes.string,
}

export default MenuSectionHeader
