import { FieldSet, Legend } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Section.module.css'

export const Section = ({ legend, children }) => (
    <div className={styles.container}>
        <FieldSet>
            <Legend className={styles.legend}>
                <span> {legend} </span>
            </Legend>
            {children}
        </FieldSet>
    </div>
)

Section.propTypes = {
    legend: PropTypes.string,
    children: PropTypes.element.isRequired,
}
