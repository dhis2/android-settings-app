import { App as D2UIApp, mui3theme as dhis2theme } from '@dhis2/d2-ui-core'
import { CssVariables } from '@dhis2/ui'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import React from 'react'
import './App.css'
import i18n from './locales/index'
import AppLayout from './pages/AppLayout.jsx'

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
