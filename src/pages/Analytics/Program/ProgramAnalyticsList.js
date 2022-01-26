import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { useDataEngine } from '@dhis2/app-runtime'
import { ProgramTable } from '../../../components/analyticVisualization'
import { useReadProgramQuery } from './ProgramVisualizationQueries'
import { rowsToDataStore, updateVisualizationRow } from './helper'
import NewProgramVisualization from './NewProgramVisualization'

const ProgramAnalyticsList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const dataEngine = useDataEngine()
    const { programList } = useReadProgramQuery()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [groups, setGroups] = useState()

    useEffect(() => {
        if (visualizations && programList) {
            updateVisualizationRow(
                visualizations,
                programList,
                dataEngine
            ).then(({ visualizationsByPrograms, groupList }) => {
                setRows(visualizationsByPrograms)
                setGroups(groupList)
                setInitialRows(visualizationsByPrograms)
            })
        }
    }, [visualizations, programList])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            handleVisualizations(rowsToDataStore(rows))
        }
    }, [rows])

    return (
        <>
            {!isEmpty(rows) && (
                <ProgramTable
                    rows={rows}
                    changeRows={setRows}
                    disabled={disable}
                />
            )}

            <NewProgramVisualization
                disable={disable}
                visualization={rows}
                handleVisualization={setRows}
                groups={groups}
                handleGroups={setGroups}
            />
        </>
    )
}

ProgramAnalyticsList.propTypes = {
    visualizations: PropTypes.object,
    handleVisualizations: PropTypes.func,
    disable: PropTypes.bool,
}

export default ProgramAnalyticsList
