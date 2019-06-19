import React from 'react'

import HeaderBar from '@dhis2/d2-ui-header-bar'
import Paper from 'material-ui/Paper'

import { TwoPanel } from '@dhis2/d2-ui-core'
import { Sidebar } from '@dhis2/d2-ui-core'
import { MainContent } from '@dhis2/d2-ui-core'
import { Heading } from '@dhis2/d2-ui-core'
// import { SvgIcon } from '@dhis2/d2-ui-core';

import {
    AndroidSettingsIcon,
    ProgramsIcon,
    DataSetIcon,
} from '../components/icons-svg'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import AndroidSettings from '../components/android-settings'
import ProgramSettings from '../components/program-settings'
import DataSetSettings from '../components/dataSet-settings'

import '../styles/settings.css'
import '../styles/layout.css'

const styles = {
    twoPanelMain: {
        marginTop: '3rem',
    },
}

const sections = [
    {
        key: '1',
        label: 'Android',
        url: 'android',
        icon: 'adb',
        path: <AndroidSettingsIcon />,
    },
    {
        key: '2',
        label: 'Programs',
        url: 'programs',
        icon: 'apps',
        path: <ProgramsIcon />,
    },
    {
        key: '3',
        label: 'Data Sets',
        url: 'dataSets',
        icon: 'description',
        path: <DataSetIcon />,
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

/* Layout, Sidebar methods */

class Layout extends React.Component {
    constructor(props) {
        super(props)
        console.log({
            props: props,
            d2: props.d2,
        })
        /* this.state = {
            d2: props.d2
        } */
    }

    /* 
    onChangeSearchText = { changeSearchTextHandler }
    ref = { storeRef }
     */
    render() {
        return (
            <Router>
                <HeaderBar d2={this.props.d2} />
                <TwoPanel mainStyle={styles.twoPanelMain}>
                    <div className="paper__two-panel__side-bar">
                        <Sidebar
                            sections={sections.map(
                                ({ key, label, url, icon, path }, i) => ({
                                    key,
                                    label,
                                    icon: path,
                                    containerElement: (
                                        <Link to={url}> {label} </Link>
                                    ),
                                })
                            )}
                            onChangeSection={changeSectionHandler}
                            showSearchField
                            searchFieldLabel="Search settings"
                        />
                    </div>
                    <MainContent>
                        <header className="header">
                            <h1 className="App-title paper__two-panel__main-title">
                                {' '}
                                Android settings{' '}
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
                                        component={ProgramSettings}
                                    />
                                    <Route
                                        path="/dataSets"
                                        component={DataSetSettings}
                                    />
                                </Switch>
                            </Heading>
                        </Paper>
                    </MainContent>
                </TwoPanel>
            </Router>
        )
    }
}

export default Layout
