import React from 'react'
import {
    analyticsPages,
    analyticsSection,
    appearancePages,
    appearanceSection,
    customIntentsPage,
    generalPage,
    syncPages,
    syncSection,
} from '../../constants/menu-sections.jsx'
import styles from './Home.module.css'
import HomeCard from './HomeCard.jsx'
import { OverviewTitle, Section } from './Section.jsx'

const Home = () => (
    <>
        <OverviewTitle />

        <h2 className={styles.sectionTitle}> {generalPage.label} </h2>
        <div className={styles.grid}>
            <HomeCard
                linkText={generalPage.linkText}
                to={generalPage.path}
                bodyText={generalPage.description}
                titleText={generalPage.label}
            />
        </div>

        <Section title={syncSection} sectionPages={syncPages} />

        <Section title={appearanceSection} sectionPages={appearancePages} />

        <Section title={analyticsSection} sectionPages={analyticsPages} />

        <h2 className={styles.sectionTitle}> {customIntentsPage.label} </h2>
        <div className={styles.grid}>
            <HomeCard
                linkText={customIntentsPage.linkText}
                to={customIntentsPage.path}
                bodyText={customIntentsPage.description}
                titleText={customIntentsPage.label}
            />
        </div>
    </>
)

export default Home
