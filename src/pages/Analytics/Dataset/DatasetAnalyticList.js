import i18n from '@dhis2/d2-i18n'
import { CircularLoader } from '@dhis2/ui'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { DatasetTable } from '../../../components/analyticVisualization'
import { NoticeError } from '../../../components/noticeAlert'
import { getVisualizationIdList } from '../helper'
import { useVisualizations } from '../VisualizationQuery'
import { useReadDatasetQuery } from './DatasetVisualizationQuery'
import { prepareRows, rowsToDataStore } from './helper'
import NewDatasetVisualization from './NewDatasetVisualization'

const DatasetAnalyticList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const {
        loading,
        error,
        visualizations: visualizationAPI,
    } = useVisualizations(getVisualizationIdList(visualizations))
    const { datasetList } = useReadDatasetQuery()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [groups, setGroups] = useState()

    useEffect(() => {
        if (visualizations && datasetList && visualizationAPI) {
            const { visualizationsByDatasets, groupList } = prepareRows(
                visualizations,
                datasetList,
                visualizationAPI
            )
            setRows(visualizationsByDatasets)
            setGroups(groupList)
            setInitialRows(visualizationsByDatasets)
        }
    }, [visualizations, datasetList, visualizationAPI])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            handleVisualizations(rowsToDataStore(rows))
        }
    }, [rows])

    return (
        <>
            {loading && <CircularLoader small />}
            {error && (
                <NoticeError
                    title={i18n.t('Error loading visualizations')}
                    notice={error.message}
                />
            )}
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
