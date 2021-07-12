import React from 'react'
import { HashRouter } from 'react-router-dom'
import SideBar from '../components/sidebar/Sidebar'
import Router from '../components/router'
import styles from '../styles/Layout.module.css'

const Layout = () => (
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

export default Layout
