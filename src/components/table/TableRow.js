import React from 'react'
import PropTypes from '@dhis2/prop-types'
import cx from 'classnames'
import styles from '../../styles/TableSettings.module.css'

export const TableRow = ({ children, dense }) => (
    <div className={cx(styles.parent, { [styles.dense]: dense })}>
        {children}
    </div>
)

TableRow.propTypes = {
    children: PropTypes.element,
    dense: PropTypes.bool,
}
