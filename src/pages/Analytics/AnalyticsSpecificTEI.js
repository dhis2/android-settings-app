import React from 'react'
import PropTypes from '@dhis2/prop-types'
import NewAnalyticSettings from './NewAnalyticSettings'
import AnalyticsTable from './AnalyticsTable'

const AnalyticsSpecificTEI = ({ settings, handleSettings, disable }) => (
    <>
        <AnalyticsTable
            rows={settings}
            disableAll={disable}
            handleRows={handleSettings}
        />

        <NewAnalyticSettings
            disable={disable}
            settings={settings}
            handleSettings={handleSettings}
        />
    </>
)

AnalyticsSpecificTEI.propTypes = {
    settings: PropTypes.array,
    handleSettings: PropTypes.func,
    disable: PropTypes.bool,
}

export default AnalyticsSpecificTEI
