import React from 'react'
import {
    analyticsPages,
    analyticsSection,
    appearancePages,
    appearanceSection,
    generalPage,
    syncPages,
    syncSection,
} from '../../constants/menu-sections'
import styles from './Home.module.css'
import HomeCard from './HomeCard'
import { OverviewTitle, Section } from './Section'

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
    </>
)

export default Home
