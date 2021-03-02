import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useNamespaceDataStore } from '../modules/apiLoadFirstSetup'
import { apiCreateFirstSetup } from '../modules/apiCreateFirstSetup'
import { menuSection } from '../constants/menu-sections'
import { D2Shim } from '../utils/D2Shim'
import DialogFirstLaunch from './dialog/dialog-first-launch'

const Router = () => {
    const [openFirstLaunch, setFirstLaunch] = useState(true)
    const [isDisabledAuthority, setAuthority] = useState(false)
    const { namespace, authority } = useNamespaceDataStore()

    useEffect(() => {
        if (namespace && authority) {
            setFirstLaunch(false)
            setAuthority(!authority)
        } else if (namespace === false && authority !== undefined) {
            setFirstLaunch(true)
            setAuthority(!authority)
        }
    }, [namespace, authority])

    const handleSave = () => {
        apiCreateFirstSetup().then(() => {
            setFirstLaunch(false)
        })
    }

    return (
        <Switch>
            <Route path="/" exact>
                <D2Shim>
                    {openFirstLaunch === true ? (
                        <DialogFirstLaunch
                            handleSave={handleSave}
                            disable={isDisabledAuthority}
                        />
                    ) : (
                        menuSection[0].component
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
                <Redirect to="/" />
            </Route>
        </Switch>
    )
}

export default Router
