import React, { useRef } from 'react'

import { TwoPanel, Sidebar, MainContent, Heading } from '@dhis2/d2-ui-core'
import { Paper } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import AndroidSettingsContainer from '../components/android-settings-container'
import ProgramSettings from '../components/program-settings'
import DataSetSettings from '../components/dataSet-settings'
import TestAndroidContainer from '../components/test-android-container'
import menuSection from '../constants/menu-sections'

/* import '../styles/settings.css'
import '../styles/layout.css' */
import { D2Shim } from '../utils/D2Shim'
import layoutStyles from '../styles/Layout.module.css'

const styles = {
    twoPanelMain: {
        marginTop: '0rem',
    },
}

function Layout(props) {
    const currentSection = useRef()
    const lastSection = useRef()
    const sidebarRef = useRef()

    const changeSectionHandler = key => {
        currentSection.current = key
        if (key !== 'search' && sidebarRef.current) {
            sidebarRef.current.clearSearchBox()
        }
    }

    const changeSearchTextHandler = searchText => {
        if (searchText.toString().trim().length > 0) {
            if (currentSection.current !== 'search') {
                lastSection.current = currentSection.current
            }
            changeSectionHandler('search', searchText, sidebarRef)
        } else {
            changeSectionHandler(lastSection.current, undefined, sidebarRef)
        }
    }
    return (
        <Router>
            <TwoPanel mainStyle={styles.twoPanelMain}>
                <div className={layoutStyles.paper__twoPanel__sideBar}>
                    <Sidebar
                        sections={menuSection.map(
                            ({ key, label, path, icon }, i) => ({
                                key,
                                label,
                                icon,
                                containerElement: (
                                    <Link to={path}> {label} </Link>
                                ),
                            })
                        )}
                        showSearchField
                        searchFieldLabel="Search settings"
                        onChangeSection={changeSectionHandler}
                        currentSection={props.currentSection}
                        onChangeSearchText={changeSearchTextHandler}
                        ref={sidebarRef}
                    />
                </div>
                <MainContent>
                    <header>
                        <h1 className={layoutStyles.paper__twoPanel__mainTitle}>
                            Android settings
                        </h1>
                    </header>
                    <Paper className={layoutStyles.paper__layout}>
                        <D2Shim>
                            <Heading>
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
                                    <Route
                                        path="/android-setting"
                                        render={() => (
                                            <D2Shim>
                                                <AndroidSettingsContainer />
                                            </D2Shim>
                                        )}
                                    />
                                    <Route
                                        path="/program-setting"
                                        render={() => (
                                            <D2Shim>
                                                <ProgramSettings />
                                            </D2Shim>
                                        )}
                                    />
                                    <Route
                                        path="/dataset-setting"
                                        render={() => (
                                            <D2Shim>
                                                <DataSetSettings />
                                            </D2Shim>
                                        )}
                                    />
                                    <Route
                                        path="/test-android-login"
                                        render={() => (
                                            <D2Shim>
                                                <TestAndroidContainer />
                                            </D2Shim>
                                        )}
                                    />
                                </Switch>
                            </Heading>
                        </D2Shim>
                    </Paper>
                </MainContent>
            </TwoPanel>
        </Router>
    )
}

export default Layout
