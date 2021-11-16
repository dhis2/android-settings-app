import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import NewHomeVisualization from './NewHomeVisualization'
import { HomeVisualizationTable } from '../../../components/analyticVisualization'

const HomeAnalyticList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const [rows, setRows] = useState()

    useEffect(() => {
        if (visualizations) {
            setRows(visualizations)
        }
    }, [visualizations])

    useEffect(() => {
        if (rows && visualizations && !isEqual(rows, visualizations)) {
            handleVisualizations(rows)
        }
    }, [rows])

    return (
        <>
            {!isEmpty(rows) && (
                <HomeVisualizationTable
                    group={rows}
                    changeGroup={setRows}
                    disable={disable}
                />
            )}

            <NewHomeVisualization
                disable={disable}
                visualization={rows}
                handleVisualization={setRows}
            />
        </>
    )
}

HomeAnalyticList.propTypes = {
    visualizations: PropTypes.array,
    handleVisualizations: PropTypes.func,
    disable: PropTypes.bool,
}

export default HomeAnalyticList
