import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useReadProgramQuery } from './AnalyticsQueries'
import AnalyticsTable from './AnalyticsTable.jsx'
import { prepareItemsList } from './helper'
import NewAnalyticSettings from './NewAnalyticSettings.jsx'

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
                            programList={programList}
                        />
                    )}

                    <NewAnalyticSettings
                        disable={disable}
                        settings={rows}
                        handleSettings={setRows}
                        programList={programList}
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
