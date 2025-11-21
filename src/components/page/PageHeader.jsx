import PropTypes from 'prop-types'
import React from 'react'
import styles from './Page.module.css'

const PageHeader = ({ title, desc }) => (
    <header>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.desc}>{desc}</p>
    </header>
)

PageHeader.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
}

export default PageHeader
