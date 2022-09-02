import React from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { Tag } from '@dhis2/ui'
import HomeCard from './HomeCard'
import { infoDefault } from '../../constants/info'
import styles from './Home.module.css'

export const OverviewTitle = () => (
    <div className={styles.titleContainer}>
        <h2 className={styles.mainTitle}>
            {i18n.t('Overview: Android Settings App', {
                nsSeparator: '---',
            })}
        </h2>
        <Tag className={styles.tagVersion}>
            {i18n.t('v{{version}}', {
                version: infoDefault.androidSettingsVersion,
            })}
        </Tag>
    </div>
)

export const Section = ({ title, sectionPages }) => (
    <>
        <h2 className={styles.sectionTitle}> {title} </h2>
        <div className={styles.grid}>
            {sectionPages.map(
                ({ path, code, linkText, description, label }) => (
                    <HomeCard
                        key={code}
                        linkText={linkText}
                        to={path}
                        bodyText={description}
                        titleText={label}
                    />
                )
            )}
        </div>
    </>
)

Section.propTypes = {
    title: PropTypes.string,
    sectionPages: PropTypes.array,
}
