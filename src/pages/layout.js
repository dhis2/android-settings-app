import React, { useRef } from 'react'

import { TwoPanel, Sidebar, MainContent, Heading } from '@dhis2/d2-ui-core'
import { Paper, Grid } from '@material-ui/core'

import {
    AndroidSettingsIcon,
    ProgramsIcon,
    DataSetIcon,
    TestRun,
} from '../components/icons-svg'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import AndroidSettingsContainer from '../components/android-settings-container'
import ProgramSettings from '../components/program-settings'
import DataSetSettings from '../components/dataSet-settings'
import TestAndroidContainer from '../components/test-android-container'

import '../styles/settings.css'
import '../styles/layout.css'
import { D2Shim } from '../utils/D2Shim'

const styles = {
    twoPanelMain: {
        marginTop: '3rem',
    },
}

const sections = [
    {
        key: 'android',
        label: 'Android',
        url: 'android',
        path: <AndroidSettingsIcon />,
    },
    {
        key: 'programs',
        label: 'Programs',
        url: 'programs',
        path: <ProgramsIcon />,
    },
    {
        key: 'dataSets',
        label: 'Data Sets',
        url: 'dataSets',
        path: <DataSetIcon />,
    },
    {
        key: 'tesAndroid',
        label: 'Test Android Login ',
        url: 'testAndroid',
        path: <TestRun />,
    },
]

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
            <Grid container>
                <TwoPanel mainStyle={styles.twoPanelMain}>
                    <Grid item>
                        <div className="paper__two-panel__side-bar">
                            <Sidebar
                                sections={sections.map(
                                    ({ key, label, url, path }, i) => ({
                                        key,
                                        label,
                                        icon: path,
                                        containerElement: (
                                            <Link to={url}> {label} </Link>
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
                    </Grid>

                    <Grid item>
                        <MainContent>
                            <header className="header">
                                <h1 className="App-title paper__two-panel__main-title">
                                    Android settings
                                </h1>
                            </header>
                            <Paper className="paper__layout">
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
                                                path="/android"
                                                render={() => (
                                                    <D2Shim>
                                                        <AndroidSettingsContainer />
                                                    </D2Shim>
                                                )}
                                            />
                                            <Route
                                                path="/programs"
                                                render={() => (
                                                    <D2Shim>
                                                        <ProgramSettings />
                                                    </D2Shim>
                                                )}
                                            />
                                            <Route
                                                path="/dataSets"
                                                render={() => (
                                                    <D2Shim>
                                                        <DataSetSettings />
                                                    </D2Shim>
                                                )}
                                            />
                                            <Route
                                                path="/testAndroid"
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
                    </Grid>
                </TwoPanel>
            </Grid>
        </Router>
    )
}

export default Layout
