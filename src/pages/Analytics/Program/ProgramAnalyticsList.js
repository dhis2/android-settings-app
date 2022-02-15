import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { CircularLoader } from '@dhis2/ui'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import NewProgramVisualization from './NewProgramVisualization'
import { ProgramTable } from '../../../components/analyticVisualization'
import { NoticeError } from '../../../components/noticeAlert'
import { useReadProgramQuery } from './ProgramVisualizationQueries'
import { useVisualizations } from '../VisualizationQuery'
import { prepareRows, rowsToDataStore } from './helper'
import { getVisualizationIdList } from '../helper'

const ProgramAnalyticsList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const {
        loading,
        error,
        visualizations: visualizationAPI,
    } = useVisualizations(getVisualizationIdList(visualizations))
    const { programList } = useReadProgramQuery()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [groups, setGroups] = useState()

    useEffect(() => {
        if (visualizations && programList && visualizationAPI) {
            const { visualizationsByPrograms, groupList } = prepareRows(
                visualizations,
                programList,
                visualizationAPI
            )
            setRows(visualizationsByPrograms)
            setGroups(groupList)
            setInitialRows(visualizationsByPrograms)
        }
    }, [visualizations, programList, visualizationAPI])

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
