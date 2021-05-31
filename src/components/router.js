import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {
    deletePrevDataStoreMutation,
    useNamespaceDataStore,
} from '../modules/apiLoadFirstSetup'
import { apiCreateFirstSetup } from '../modules/apiCreateFirstSetup'
import { menuSection } from '../constants/menu-sections'
import { D2Shim } from '../utils/D2Shim'
import DialogFirstLaunch from './dialog/dialog-first-launch'
import { useDataMutation } from '@dhis2/app-runtime'

const Router = () => {
    const [openFirstLaunch, setFirstLaunch] = useState(true)
    const { namespace, hasPreviousVersion } = useNamespaceDataStore()
    const [mutate] = useDataMutation(deletePrevDataStoreMutation)

    useEffect(() => {
        namespace ? setFirstLaunch(false) : setFirstLaunch(true)
    }, [namespace])

    const handleSave = async () => {
        if (hasPreviousVersion) {
            await mutate()
        }
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
                            isOutOfDate={hasPreviousVersion}
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
