import React from 'react'
import styles from '../styles/TableActions.module.css'

const Wrapper = props => (
    <div className={styles.container}>{props.children}</div>
)

export default Wrapper
