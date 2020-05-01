import React from 'react'

import { TwoPanel, MainContent } from '@dhis2/d2-ui-core'
import { Paper } from '@material-ui/core'
import { Route, Switch, HashRouter } from 'react-router-dom'

import AndroidSettingsContainer from '../components/android-settings-container'
import menuSection from '../constants/menu-sections'

import { D2Shim } from '../utils/D2Shim'
import layoutStyles from '../styles/Layout.module.css'
import api from '../utils/api'
import {
    DATASET_SETTINGS,
    GENERAL_SETTINGS,
    NAMESPACE,
    PROGRAM_SETTINGS,
} from '../constants/data-store'
import { androidSettingsDefault } from '../constants/android-settings'
import { programSettingsDefault } from '../constants/program-settings'
import { dataSetSettingsDefault } from '../constants/data-set-settings'
import DialogFirstLaunch from '../components/dialog/dialog-first-launch'
import SideBar from '../components/sidebar'

const styles = {
    twoPanelMain: {
        marginTop: '0rem',
    },
}

const DEFAULT_PROGRAM = 'DEFAULT_PROGRAM'
const DEFAULT_DATASET = 'DEFAULT_DATASET'

const populateObject = type => {
    let object = {}
    switch (type) {
        case DEFAULT_PROGRAM:
            object = {
                settingDownload: programSettingsDefault.settingDownload,
                teiDownload: programSettingsDefault.teiDownload,
                enrollmentDownload: programSettingsDefault.enrollmentDownload,
                enrollmentDateDownload:
                    programSettingsDefault.enrollmentDateDownload,
                updateDownload: programSettingsDefault.updateDownload,
                eventsDownload: programSettingsDefault.eventsDownload,
                eventDateDownload: programSettingsDefault.eventDateDownload,
            }
            break
        case DEFAULT_DATASET:
            object = {
                periodDSDownload: dataSetSettingsDefault.periodDSDownload,
            }
            break
        default:
            break
    }
    return object
}

class Layout extends React.Component {
    state = {
        openFirstLaunch: false,
        isSaved: false,
    }

    handleClose = () => {
        this.setState({
            openFirstLaunch: false,
            isSaved: false,
        })
    }

    handleSave = () => {
        api.createNamespace(NAMESPACE, GENERAL_SETTINGS)
            .then(() => {
                return Promise.all([
                    api.updateValue(NAMESPACE, GENERAL_SETTINGS, {
                        ...androidSettingsDefault,
                    }),
                    api.createValue(NAMESPACE, PROGRAM_SETTINGS, {
                        globalSettings: populateObject(DEFAULT_PROGRAM),
                    }),
                    api.createValue(NAMESPACE, DATASET_SETTINGS, {
                        globalSettings: populateObject(DEFAULT_DATASET),
                    }),
                ])
            })
            .then(() => {
                this.setState({
                    openFirstLaunch: false,
                    isSaved: true,
                })
            })
    }

    componentDidMount() {
        api.getNamespaces()
            .then(res => {
                const nameSpace = res.filter(name => name === NAMESPACE)
                nameSpace.length === 0
                    ? this.setState({
                          openFirstLaunch: true,
                      })
                    : this.setState({
                          openFirstLaunch: false,
                          isSaved: true,
                      })
            })
            .catch(e => {
                console.error(e)
            })
    }

    render() {
        if (this.state.openFirstLaunch === true) {
            return (
                <DialogFirstLaunch
                    openDialog={this.state.openFirstLaunch}
                    onClose={this.handleClose}
                    handleSave={this.handleSave}
                />
            )
        }

        return (
            <HashRouter>
                <TwoPanel mainStyle={styles.twoPanelMain}>
                    <SideBar />
                    <MainContent>
                        <Paper className={layoutStyles.paper__layout}>
                            <Switch>
                                <Route
                                    path="/"
                                    exact
                                    render={() => <AndroidSettingsContainer />}
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
                        </Paper>
                    </MainContent>
                </TwoPanel>
            </HashRouter>
        )
    }
}

export default Layout
