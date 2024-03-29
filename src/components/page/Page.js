import { CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { VisualizationsError } from '../noticeAlert'
import UnsavedChangesAlert from '../UnsavedChangesAlert'
import styles from './Page.module.css'

const Page = ({
    loading,
    title,
    desc,
    unsavedChanges,
    error,
    authority,
    children,
}) => {
    if (error) {
        return <VisualizationsError error={error.message} />
    }

    if (loading) {
        return <CircularLoader small />
    }

    return (
        <>
            <header>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.desc}>{desc}</p>
            </header>

            <div className={styles.content}>
                {authority && (
                    <UnsavedChangesAlert unsavedChanges={unsavedChanges} />
                )}
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
    error: PropTypes.object,
    authority: PropTypes.bool,
    children: PropTypes.element,
}

export default Page
