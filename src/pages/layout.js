import React from 'react'

import { TwoPanel, MainContent } from '@dhis2/d2-ui-core'
import { Paper } from '@material-ui/core'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import menuSection from '../constants/menu-sections'
import { D2Shim } from '../utils/D2Shim'
import layoutStyles from '../styles/Layout.module.css'
import DialogFirstLaunch from '../components/dialog/dialog-first-launch'
import SideBar from '../components/sidebar'
import { apiCreateFirstSetup } from '../modules/apiCreateFirstSetup'
import {
    apiFirstLoad,
    NO_AUTHORITY,
    WITH_NAMESPACE,
} from '../modules/apiLoadFirstSetup'

const styles = {
    twoPanelMain: {
        marginTop: '0rem',
    },
}

class Layout extends React.Component {
    state = {
        openFirstLaunch: true,
        isSaved: false,
        disableAuthority: false,
    }

    handleClose = () => {
        this.setState({
            isSaved: false,
        })
    }

    handleSave = () => {
        apiCreateFirstSetup().then(() => {
            this.setState({
                openFirstLaunch: false,
                isSaved: true,
            })
        })
    }

    componentDidMount() {
        apiFirstLoad()
            .then(result => {
                if (result === WITH_NAMESPACE) {
                    this.setState({
                        openFirstLaunch: false,
                        isSaved: true,
                    })
                } else if (result === NO_AUTHORITY) {
                    this.setState({
                        openFirstLaunch: true,
                        isSaved: false,
                        disableAuthority: true,
                    })
                }
            })
            .catch(e => {
                console.error(e)
            })
    }

    render() {
        return (
            <HashRouter>
                <TwoPanel mainStyle={styles.twoPanelMain}>
                    <SideBar />
                    <MainContent>
                        <Paper className={layoutStyles.paper__layout}>
                            <Switch>
                                <Route path="/" exact>
                                    <D2Shim>
                                        {this.state.openFirstLaunch === true ? (
                                            <DialogFirstLaunch
                                                handleSave={this.handleSave}
                                                onClose={this.handleClose}
                                                disable={
                                                    this.state.disableAuthority
                                                }
                                            />
                                        ) : (
                                            <Redirect
                                                to={menuSection[0].path}
                                            />
                                        )}
                                    </D2Shim>
                                </Route>

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
