import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { App as D2UIApp, mui3theme as dhis2theme } from '@dhis2/d2-ui-core'
import { CssVariables } from '@dhis2/ui'
import './App.css'
import AppLayout from './pages/AppLayout'

const App = () => (
    <>
        <CssVariables colors spacers />
        <D2UIApp>
            <MuiThemeProvider theme={createMuiTheme(dhis2theme)}>
                <AppLayout />
            </MuiThemeProvider>
        </D2UIApp>
    </>
)

export default App
