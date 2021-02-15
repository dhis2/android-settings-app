import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { apiFirstLoad } from '../modules/apiLoadFirstSetup'
import { apiCreateFirstSetup } from '../modules/apiCreateFirstSetup'
import { menuSection } from '../constants/menu-sections'
import { D2Shim } from '../utils/D2Shim'
import DialogFirstLaunch from './dialog/dialog-first-launch'
import PageNotFound from './page-not-found'

// TODO: change Overview div to Overview component

const Router = () => {
    const [openFirstLaunch, setFirstLaunch] = useState(true)
    const [isSaved, setSaved] = useState(false)
    const [isDisabledAuthority, disableAuthority] = useState(false)

    useEffect(() => {
        apiFirstLoad()
            .then(({ hasNamespace, hasAuthority }) => {
                if (hasNamespace) {
                    setFirstLaunch(false)
                    setSaved(true)
                } else {
                    setFirstLaunch(true)
                    setSaved(false)
                    disableAuthority(!hasAuthority)
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
                        <div> Overview </div>
                    )}
                </D2Shim>
            </Route>

            {menuSection.map(section => (
                <Route
                    exact
                    key={section.code}
                    path={section.path}
                    render={() => <D2Shim>{section.component}</D2Shim>}
                />
            ))}

            <Route path="*">
                <PageNotFound />
            </Route>
        </Switch>
    )
}

export default Router
