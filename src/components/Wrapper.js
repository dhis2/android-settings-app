import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles/TableActions.module.css'

const Wrapper = ({ children, fullWidth }) => (
    <div
        className={cx(styles.container, {
            [styles.fullContainer]: fullWidth,
        })}
    >
        {children}
    </div>
)

Wrapper.propTypes = {
    children: PropTypes.element.isRequired,
    fullWidth: PropTypes.bool,
}

export default Wrapper
