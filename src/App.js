import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { App as D2UIApp, mui3theme as dhis2theme } from '@dhis2/d2-ui-core'

import './App.css'

const styles = {
    app: {
        backgroundColor: '#F3F3F3',
        fontFamily: 'Roboto, sans-serif',
    },
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            d2: props.d2,
        }
    }

    getChildContext() {
        return { d2: this.state.d2 }
    }

    render() {
        if (!this.state.d2) {
            console.log('no')
            return null
        } else {
            console.log(this.state.d2)
        }

        return (
            <div style={styles.app}>
                <D2UIApp>
                    <MuiThemeProvider theme={createMuiTheme(dhis2theme)}>
                        Hola
                    </MuiThemeProvider>
                </D2UIApp>
            </div>
        )
    }
}

App.childContextTypes = {
    d2: PropTypes.object,
}

App.propTypes = {
    d2: PropTypes.object.isRequired,
}
export default App
