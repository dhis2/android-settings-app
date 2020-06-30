import React from 'react'

import i18n from '@dhis2/d2-i18n'
import { Link } from 'react-router-dom'
import styles from '../styles/LayoutTitles.module.css'

const PageNotFound = () => {
    let path = location.hash
    path = path.split('#')[1]

    return (
        <div>
            <p className={styles.mainContent__title_headerBar}>
                {i18n.t('404 Page not found.')}
            </p>
            <p
                className={`${styles.mainContent__subtitle} ${styles.margin_top40}`}
            >
                {i18n.t('No match for')}
                <code> {path} </code>
            </p>
            <Link to="/"> {i18n.t('Go back to General settings')}</Link>
        </div>
    )
}

export default PageNotFound
