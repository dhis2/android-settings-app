import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import isEqual from 'lodash/isEqual'
import NewAnalyticSettings from './NewAnalyticSettings'
import AnalyticsTable from './AnalyticsTable'
import { useReadProgramQuery } from './AnalyticsQueries'
import { prepareItemsList } from './helper'

const AnalyticsSpecificTEI = ({ settings, handleSettings, disable }) => {
    const { programList } = useReadProgramQuery()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [loadSpecific, setLoad] = useState(false)

    useEffect(() => {
        if (settings && programList) {
            prepareItemsList(settings, programList)
            setRows(settings)
            setInitialRows(settings)
            setLoad(true)
        }
    }, [programList, settings])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            handleSettings(rows)
        }
    }, [rows])

    return (
        <>
            {loadSpecific && (
                <>
                    {rows && (
                        <AnalyticsTable
                            rows={rows}
                            handleRows={setRows}
                            disableAll={disable}
                        />
                    )}

                    <NewAnalyticSettings
                        disable={disable}
                        settings={rows}
                        handleSettings={setRows}
                    />
                </>
            )}
        </>
    )
}

AnalyticsSpecificTEI.propTypes = {
    settings: PropTypes.array,
    handleSettings: PropTypes.func,
    disable: PropTypes.bool,
}

export default AnalyticsSpecificTEI
