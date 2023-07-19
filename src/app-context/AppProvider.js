import { useDataQuery } from '@dhis2/app-runtime'
import { ComponentCover, CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { AppContext } from './AppContext'

const query = {
    me: {
        resource: 'me',
        params: {
            fields: ['authorities', 'username'],
        },
    },
    dataStore: {
        resource: 'dataStore',
    },
}

const AppProvider = ({ children }) => {
    const { data, fetching, error } = useDataQuery(query)
    if (fetching) {
        return (
            <ComponentCover dataTest="app-screen-cover">
                <CircularLoader dataTest="app-loader" />
            </ComponentCover>
        )
    }

    if (error) {
        /**
         * The app can't continue if this fails, because it doesn't
         * have any data, so throw the error and let it be caught by
         * the error boundary in the app-shell
         */
        throw error
    }

    const { authorities, username } = data.me
    const dataStore = data.dataStore
    const providerValue = {
        authorities,
        username,
        dataStore,
    }

    return (
        <AppContext.Provider value={providerValue}>
            {children}
        </AppContext.Provider>
    )
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { AppProvider }
