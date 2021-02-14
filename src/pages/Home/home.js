import React from 'react'
import {
    analyticsPage,
    appearancePages,
    appearanceSection,
    generalPage,
    syncPages,
    syncSection,
} from '../../constants/menu-sections'

import styles from './Home.module.css'
import HomeCard from './home-card'

const Home = () => (
    <>
        <h2 className={styles.sectionTitle}> {generalPage.label} </h2>
        <div className={styles.grid}>
            <HomeCard
                linkText={generalPage.linkText}
                to={generalPage.path}
                bodyText={generalPage.description}
                titleText={generalPage.label}
            />
        </div>

        <h2 className={styles.sectionTitle}> {syncSection} </h2>
        <div className={styles.grid}>
            {syncPages.map(({ path, code, linkText, description, label }) => (
                <HomeCard
                    key={code}
                    linkText={linkText}
                    to={path}
                    bodyText={description}
                    titleText={label}
                />
            ))}
        </div>

        <h2 className={styles.sectionTitle}> {appearanceSection} </h2>
        <div className={styles.grid}>
            {appearancePages.map(
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

        <h2 className={styles.sectionTitle}> {analyticsPage.label} </h2>
        <div className={styles.grid}>
            <HomeCard
                linkText={analyticsPage.linkText}
                to={analyticsPage.path}
                bodyText={analyticsPage.description}
                titleText={analyticsPage.label}
            />
        </div>
    </>
)

export default Home
