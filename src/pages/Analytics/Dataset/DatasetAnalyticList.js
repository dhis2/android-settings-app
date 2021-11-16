import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { useReadDatasetQuery } from './DatasetVisualizationQuery'
import { prepareRows, rowsToDataStore } from './helper'
import NewDatasetVisualization from './NewDatasetVisualization'
import { DatasetTable } from '../../../components/analyticVisualization'

const DatasetAnalyticList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const { datasetList } = useReadDatasetQuery()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [groups, setGroups] = useState()

    useEffect(() => {
        if (visualizations && datasetList) {
            const { visualizationsByDatasets, groupList } = prepareRows(
                visualizations,
                datasetList
            )
            setRows(visualizationsByDatasets)
            setGroups(groupList)
            setInitialRows(visualizationsByDatasets)
        }
    }, [visualizations, datasetList])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            handleVisualizations(rowsToDataStore(rows))
        }
    }, [rows])

    return (
        <>
            {!isEmpty(rows) && (
                <DatasetTable
                    rows={rows}
                    changeRows={setRows}
                    disabled={disable}
                />
            )}

            <NewDatasetVisualization
                disable={disable}
                visualization={rows}
                handleVisualization={setRows}
                groups={groups}
                handleGroups={setGroups}
            />
        </>
    )
}

DatasetAnalyticList.propTypes = {
    visualizations: PropTypes.object,
    handleVisualizations: PropTypes.func,
    disable: PropTypes.bool,
}

export default DatasetAnalyticList
