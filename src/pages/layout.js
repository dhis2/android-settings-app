import React from 'react'

import D2UICore from '@dhis2/d2-ui-core'
const { TwoPanel, Sidebar, MainContent, Heading, Paper, Grid } = D2UICore

import {
    AndroidSettingsIcon,
    ProgramsIcon,
    DataSetIcon,
    TestRun,
} from '../components/icons-svg'

import ReactRouterDom from 'react-router-dom'
const { BrowserRouter: Router, Route, Link, Switch } = ReactRouterDom

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

/* Layout, Sidebar methods */

let currentSection
let lastSection
let sidebarRef

function changeSectionHandler(key, searchText) {
    console.log({
        key: key,
        searchText: searchText,
    })
    currentSection = key
    if (key !== 'search' && sidebarRef) {
        sidebarRef.clearSearchBox()
    }
}

function changeSearchTextHandler(searchText) {
    console.log('changeSearch', searchText)
    if (searchText.toString().trim().length > 0) {
        if (currentSection !== 'search') {
            lastSection = currentSection
        }
        changeSectionHandler('search', searchText)
    } else {
        changeSectionHandler(lastSection)
    }
}

function storeRef(ref) {
    sidebarRef = ref
}

function Layout(props) {
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
                                ref={storeRef}
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
                                <Heading>
                                    <Switch>
                                        <Route
                                            path="/"
                                            exact
                                            render={() => (
                                                <AndroidSettingsContainer />
                                            )}
                                        />
                                        <Route
                                            path="/android"
                                            render={() => (
                                                <AndroidSettingsContainer />
                                            )}
                                        />
                                        <Route
                                            path="/programs"
                                            render={() => <ProgramSettings />}
                                        />
                                        <Route
                                            path="/dataSets"
                                            render={() => <DataSetSettings />}
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
                            </Paper>
                        </MainContent>
                    </Grid>
                </TwoPanel>
            </Grid>
        </Router>
    )
}

export default Layout
