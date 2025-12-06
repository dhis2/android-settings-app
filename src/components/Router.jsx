import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { menuSection } from '../constants/menu-sections.jsx'
import { D2Shim } from '../utils/D2Shim'

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <D2Shim>{menuSection[0].component}</D2Shim>
            </Route>

            {menuSection.map((section) => (
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
