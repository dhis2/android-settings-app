import React from 'react'

import { TwoPanel, MainContent } from '@dhis2/d2-ui-core'
import { Paper } from '@material-ui/core'
import { Route, Switch, HashRouter } from 'react-router-dom'

import AndroidSettingsContainer from '../components/android-settings-container'
import menuSection from '../constants/menu-sections'

import { D2Shim } from '../utils/D2Shim'
import layoutStyles from '../styles/Layout.module.css'
import SideBar from '../components/sidebar'

const styles = {
    twoPanelMain: {
        marginTop: '0rem',
    },
}

const Layout = () => {
    return (
        <HashRouter>
            <TwoPanel mainStyle={styles.twoPanelMain}>
                <SideBar />
                <MainContent>
                    <Paper className={layoutStyles.paper__layout}>
                        <D2Shim>
                            <Switch>
                                <Route
                                    path="/"
                                    exact
                                    render={() => (
                                        <D2Shim>
                                            <AndroidSettingsContainer />
                                        </D2Shim>
                                    )}
                                />

                                {menuSection.map(section => (
                                    <Route
                                        key={section.key}
                                        path={section.path}
                                        render={() => (
                                            <D2Shim>{section.component}</D2Shim>
                                        )}
                                    />
                                ))}
                            </Switch>
                        </D2Shim>
                    </Paper>
                </MainContent>
            </TwoPanel>
        </HashRouter>
    )
}

export default Layout
