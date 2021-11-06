import { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { ANALYTICS, NAMESPACE } from '../../constants/data-store'

/**
 * update data store
 * key: Analytics
 * Settings that can be saved here: TEI, Home Screen, Programs, Dataset
 * */

export const saveAnalyticsKeyMutation = {
    resource: `dataStore/${NAMESPACE}/${ANALYTICS}`,
    type: 'update',
    data: ({ settings }) => ({
        ...settings,
        lastUpdated: new Date().toJSON(),
    }),
}

/**
 * Query to get Analytics Settings from Data store
 * key: Appearance Settings
 * */

export const getAnalyticsKeyQuery = {
    analytics: {
        resource: `dataStore/${NAMESPACE}/${ANALYTICS}`,
    },
}

/**
 * Read Analytics Data store values:
 * */

export const useReadAnalyticsDataStore = () => {
    const [teiAnalytics, setTei] = useState()
    const [visualizations, setVisualizations] = useState()
    const [home, setHome] = useState()
    const [program, setProgram] = useState()
    const [dataSet, setDataSet] = useState()

    const { loading, error } = useDataQuery(getAnalyticsKeyQuery, {
        onComplete: result => {
            const { tei, dhisVisualizations } = result.analytics
            setTei(tei || [])
            setHome(dhisVisualizations ? dhisVisualizations.home : [])
            setProgram(dhisVisualizations ? dhisVisualizations.program : {})
            setDataSet(dhisVisualizations ? dhisVisualizations.dataSet : {})
            setVisualizations(
                dhisVisualizations
                    ? dhisVisualizations
                    : {
                          home: [],
                          program: {},
                          dataSet: {},
                      }
            )
        },
    })

    return {
        load: loading,
        errorDataStore: error,
        tei: teiAnalytics,
        dhisVisualizations: visualizations,
        home,
        program,
        dataSet,
    }
}
