import React from 'react'
import { HashRouter } from 'react-router-dom'
import Router from '../components/Router'
import SideBar from '../components/sidebar/Sidebar'
import styles from '../styles/Layout.module.css'

const AppLayout = () => (
    <HashRouter>
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <SideBar />
            </div>
            <div className={styles.content}>
                <Router />
            </div>
        </div>
    </HashRouter>
)

export default AppLayout
