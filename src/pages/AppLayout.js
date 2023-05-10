import React from 'react'
import { HashRouter } from 'react-router-dom'
import { AppProvider } from '../app-context'
import { AuthWall } from '../auth'
import Router from '../components/Router'
import SideBar from '../components/sidebar/Sidebar'
import styles from '../styles/Layout.module.css'

const AppLayout = () => (
    <HashRouter>
        <AppProvider>
            <AuthWall>
                <div className={styles.container}>
                    <div className={styles.sidebar}>
                        <SideBar />
                    </div>
                    <div className={styles.content}>
                        <Router />
                    </div>
                </div>
            </AuthWall>
        </AppProvider>
    </HashRouter>
)

export default AppLayout
