import React from 'react'
import { CircularLoader } from '@dhis2/ui'
import PropTypes from '@dhis2/prop-types'
import styles from './Page.module.css'
import UnsavedChangesAlert from '../UnsavedChangesAlert'

const Page = ({ loading, title, desc, unsavedChanges, children }) => {
    if (loading === true) {
        return <CircularLoader small />
    }

    return (
        <>
            <header>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.desc}>{desc}</p>
            </header>

            <div className={styles.content}>
                <UnsavedChangesAlert unsavedChanges={unsavedChanges} />
                {children}
            </div>
        </>
    )
}

Page.propTypes = {
    loading: PropTypes.bool,
    title: PropTypes.string,
    desc: PropTypes.string,
    unsavedChanges: PropTypes.bool,
    children: PropTypes.element,
}

export default Page
