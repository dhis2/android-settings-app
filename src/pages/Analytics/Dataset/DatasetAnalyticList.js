import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { useReadDatasetQuery } from './DatasetVisualizationQuery'
import { prepareRows, rowsToDataStore } from './helper'
import { DatasetTable } from '../../../components/analyticVisualization'
import { AddNewSetting } from '../../../components/field'

const DatasetAnalyticList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const { datasetList } = useReadDatasetQuery()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()

    useEffect(() => {
        if (visualizations && datasetList) {
            const { visualizationsByDatasets } = prepareRows(
                visualizations,
                datasetList
            )
            setRows(visualizationsByDatasets)
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

            <AddNewSetting
                label={i18n.t('Add Data set Visualization')}
                disable={disable}
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
