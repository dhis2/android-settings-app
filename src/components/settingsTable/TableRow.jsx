import PropTypes from 'prop-types'
import React from 'react'
import styles from '../../styles/TableSettings.module.css'

const TableRow = (props) => (
    <div className={styles.parent}>{props.children}</div>
)

TableRow.propTypes = {
    children: PropTypes.node,
}

export default TableRow
