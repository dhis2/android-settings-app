import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useNamespaceDataStore } from '../modules/apiLoadFirstSetup'
import { apiCreateFirstSetup } from '../modules/apiCreateFirstSetup'
import { menuSection } from '../constants/menu-sections'
import { D2Shim } from '../utils/D2Shim'
import DialogFirstLaunch from './dialog/dialog-first-launch'

const Router = () => {
    const [openFirstLaunch, setFirstLaunch] = useState(true)
    const { namespace } = useNamespaceDataStore()

    useEffect(() => {
        namespace ? setFirstLaunch(false) : setFirstLaunch(true)
    }, [namespace])

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
                        <DialogFirstLaunch handleSave={handleSave} />
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
