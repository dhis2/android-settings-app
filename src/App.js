import React from 'react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { App as D2UIApp, mui3theme as dhis2theme } from '@dhis2/d2-ui-core'
import { CssVariables } from '@dhis2/ui'
import './App.css'
import Layout from './pages/layout'

const App = () => {
    return (
        <div className="app__container">
            <CssVariables colors spacers />
            <D2UIApp>
                <MuiThemeProvider theme={createMuiTheme(dhis2theme)}>
                    <Layout />
                </MuiThemeProvider>
            </D2UIApp>
        </div>
    )
}

export default App
