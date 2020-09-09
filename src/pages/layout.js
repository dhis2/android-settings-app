import React, { useEffect, useState } from 'react'

import { TwoPanel, MainContent } from '@dhis2/d2-ui-core'
import { Card } from '@dhis2/ui'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import menuSection from '../constants/menu-sections'
import { D2Shim } from '../utils/D2Shim'
import layoutStyles from '../styles/Layout.module.css'
import DialogFirstLaunch from '../components/dialog/dialog-first-launch'
import SideBar from '../components/sidebar'
import PageNotFound from '../components/page-not-found'
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

const Layout = () => {
    const [openFirstLaunch, setFirstLaunch] = useState(true)
    const [isSaved, setSaved] = useState(false)
    const [isDisabledAuthority, disableAuthority] = useState(false)

    useEffect(() => {
        apiFirstLoad()
            .then(result => {
                if (result === WITH_NAMESPACE) {
                    setFirstLaunch(false)
                    setSaved(true)
                } else if (result === NO_AUTHORITY) {
                    setFirstLaunch(true)
                    setSaved(false)
                    disableAuthority(true)
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
        apiCreateFirstSetup().then(() => {
            setFirstLaunch(false)
            setSaved(true)
        })
    }

    return (
        <HashRouter>
            <TwoPanel mainStyle={styles.twoPanelMain}>
                <SideBar />
                <MainContent>
                    <Card className={layoutStyles.paper__layout}>
                        <Switch>
                            <Route path="/" exact>
                                <D2Shim>
                                    {openFirstLaunch === true ? (
                                        <DialogFirstLaunch
                                            handleSave={handleSave}
                                            onClose={handleClose}
                                            disable={isDisabledAuthority}
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
                    </Card>
                </MainContent>
            </TwoPanel>
        </HashRouter>
    )
}

export default Layout
