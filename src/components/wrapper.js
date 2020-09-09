import React from 'react'
import cx from 'classnames'
import styles from '../styles/TableActions.module.css'

const Wrapper = props => (
    <div
        className={cx(styles.container, {
            [styles.fullContainer]: props.fullWidth,
        })}
    >
        {props.children}
    </div>
)

export default Wrapper
