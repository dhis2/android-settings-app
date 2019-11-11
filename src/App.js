import React from 'react'

import MuiStyles from '@material-ui/core/styles'
const { MuiThemeProvider, createMuiTheme } = MuiStyles

import D2UICore from '@dhis2/d2-ui-core'
const { App: D2UIApp, mui3theme: dhis2theme } = D2UICore

import './App.css'
import Layout from './pages/layout'

const App = () => {
    return (
        <div className="app__container">
            <D2UIApp>
                <MuiThemeProvider theme={createMuiTheme(dhis2theme)}>
                    <Layout />
                </MuiThemeProvider>
            </D2UIApp>
        </div>
    )
}

export default App
