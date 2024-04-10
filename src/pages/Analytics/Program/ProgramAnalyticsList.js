import i18n from '@dhis2/d2-i18n'
import { CircularLoader } from '@dhis2/ui'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { ProgramTable } from '../../../components/analyticVisualization'
import { NoticeError } from '../../../components/noticeAlert'
import { useWorkflowContext } from '../../../workflow-context'
import { getVisualizationIdList } from '../helper'
import { useVisualizations } from '../VisualizationQuery'
import { prepareRows, rowsToDataStore } from './helper'
import NewProgramVisualization from './NewProgramVisualization'

const ProgramAnalyticsList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const {
        loading,
        error,
        visualizations: visualizationAPI,
        dataVisualizations,
        eventVisualizations,
    } = useVisualizations(getVisualizationIdList(visualizations))
    const { programs: programList } = useWorkflowContext()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [groups, setGroups] = useState()

    useEffect(() => {
        if (visualizations && programList && dataVisualizations) {
            const { visualizationsByPrograms, groupList } = prepareRows(
                visualizations,
                programList,
                dataVisualizations
            )
            setRows(visualizationsByPrograms)
            setGroups(groupList)
            setInitialRows(visualizationsByPrograms)
        }
    }, [visualizations, programList, visualizationAPI, eventVisualizations])

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
