import React from 'react'
import PropTypes from '@dhis2/prop-types'
import styles from './Page.module.css'

const PageSubtitle = ({ title, desc }) => (
    <header>
        <h4 className={styles.subtitle}>{title}</h4>
        <p className={styles.desc}>{desc}</p>
    </header>
)

PageSubtitle.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
}

export default PageSubtitle
