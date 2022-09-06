import PropTypes from 'prop-types'
import React from 'react'
import styles from './Field.module.css'

export const FieldSection = props => (
    <div className={styles.row}>{props.children}</div>
)

FieldSection.propTypes = {
    children: PropTypes.element,
}
