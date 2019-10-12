import React from 'react'

import HeaderBar from '@dhis2/d2-ui-header-bar'

import { TwoPanel } from '@dhis2/d2-ui-core'
import { Sidebar } from '@dhis2/d2-ui-core'
import { MainContent } from '@dhis2/d2-ui-core'
import { Heading } from '@dhis2/d2-ui-core'

import { Paper } from '@material-ui/core'
import { Grid } from '@material-ui/core'

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
//let pathname

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

/* Layout, Sidebar methods */

/* class Layout extends React.Component {
    constructor(props) {
        super(props)
        console.log({
            props: props,
            d2: props.d2,
        })
    }

    componentDidMount() {
        pathname = window.location.pathname
        pathname = pathname.split("/")
        console.log('current mount', this.props.currentSection)
        currentSection = pathname[1]
        sidebarRef.state.currentSection = currentSection
        console.log(pathname[1], currentSection, sidebarRef.state.currentSection, this.props)
    }

    render() {
        return (
            <Router>
                <HeaderBar d2={this.props.d2} />
                <TwoPanel mainStyle={styles.twoPanelMain}>
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
                            currentSection={this.props.currentSection}
                            onChangeSearchText={changeSearchTextHandler}
                            ref={storeRef}
                        />
                    </div>
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
                                            <AndroidSettings
                                                d2={this.props.d2}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/android"
                                        render={() => (
                                            <AndroidSettings
                                                d2={this.props.d2}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/programs"
                                        render={() => (
                                            <ProgramSettings
                                                d2={this.props.d2}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/dataSets"
                                        render={() => (
                                            <DataSetSettings
                                                d2={this.props.d2}
                                            />
                                        )}
                                    />
                                </Switch>
                            </Heading>
                        </Paper>
                    </MainContent>
                </TwoPanel>
            </Router>
        )
    }
} */

function Layout(props) {
    props.d2.i18n.translations['app_search_placeholder'] = 'Search Apps'
    return (
        <Router>
            <HeaderBar d2={props.d2} />
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
                                                <AndroidSettingsContainer
                                                    d2={props.d2}
                                                />
                                            )}
                                        />
                                        <Route
                                            path="/android"
                                            render={() => (
                                                <AndroidSettingsContainer
                                                    d2={props.d2}
                                                />
                                            )}
                                        />
                                        <Route
                                            path="/programs"
                                            render={() => (
                                                <ProgramSettings
                                                    d2={props.d2}
                                                />
                                            )}
                                        />
                                        <Route
                                            path="/dataSets"
                                            render={() => (
                                                <DataSetSettings
                                                    d2={props.d2}
                                                />
                                            )}
                                        />
                                        <Route
                                            path="/testAndroid"
                                            render={() => (
                                                <TestAndroidContainer
                                                    d2={props.d2}
                                                />
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

/* render = {() => (
    <AndroidSettings
        d2={this.props.d2}
    />
)} */
