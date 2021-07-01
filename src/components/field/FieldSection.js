import React from 'react'
import PropTypes from '@dhis2/prop-types'
import styles from './Fied.module.css'

export const FieldSection = props => (
    <div className={styles.row}>{props.children}</div>
)

FieldSection.propTypes = {
    children: PropTypes.element,
}
