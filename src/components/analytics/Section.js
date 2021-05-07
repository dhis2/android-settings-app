import React from 'react'
import { FieldSet, Legend } from '@dhis2/ui'
import styles from './Section.module.css'

export const Section = props => (
    <div className={styles.container}>
        <FieldSet>
            <Legend className={styles.legend}>
                <span> {props.legend} </span>
            </Legend>
            {props.children}
        </FieldSet>
    </div>
)
