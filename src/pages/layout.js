import React, { useEffect, useState } from 'react'

import { TwoPanel, MainContent } from '@dhis2/d2-ui-core'
import { Paper } from '@material-ui/core'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
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
import DialogFirstLaunch from '../components/dialog/dialog-first-launch'
import SideBar from '../components/sidebar'
import PageNotFound from '../components/page-not-found'
import {
    DEFAULT_DATASET,
    DEFAULT_PROGRAM,
    populateObject,
} from '../modules/populateDefaultSettings'

const styles = {
    twoPanelMain: {
        marginTop: '0rem',
    },
}

const Layout = () => {
    const [openFirstLaunch, setFirstLaunch] = useState(true)
    const [isSaved, setSaved] = useState(false)

    useEffect(() => {
        api.getNamespaces()
            .then(res => {
                if (res.includes(NAMESPACE)) {
                    setFirstLaunch(false)
                    setSaved(true)
                }
            })
            .catch(e => {
                console.error(e)
            })
    }, [])

    const handleClose = () => {
        setSaved(false)
    }

    const handleSave = () => {
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
                setSaved(true)
                setFirstLaunch(false)
            })
    }

    return (
        <HashRouter>
            <TwoPanel mainStyle={styles.twoPanelMain}>
                <SideBar />
                <MainContent>
                    <Paper className={layoutStyles.paper__layout}>
                        <Switch>
                            <Route path="/" exact>
                                <D2Shim>
                                    {openFirstLaunch === true ? (
                                        <DialogFirstLaunch
                                            handleSave={handleSave}
                                            onClose={handleClose}
                                        />
                                    ) : (
                                        <Redirect to={menuSection[0].path} />
                                    )}
                                </D2Shim>
                            </Route>

                            {menuSection.map(section => (
                                <Route
                                    exact
                                    key={section.key}
                                    path={section.path}
                                    render={() => (
                                        <D2Shim>{section.component}</D2Shim>
                                    )}
                                />
                            ))}

                            <Route path="*">
                                <PageNotFound />
                            </Route>
                        </Switch>
                    </Paper>
                </MainContent>
            </TwoPanel>
        </HashRouter>
    )
}

export default Layout
