import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { ProgramTable } from '../../../components/analyticVisualization'
import { useReadProgramQuery } from './ProgramVisualizationQueries'
import { prepareRows, rowsToDataStore } from './helper'
import { AddNewSetting } from '../../../components/field'

const ProgramAnalyticsList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const { programList } = useReadProgramQuery()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()

    useEffect(() => {
        if (visualizations && programList) {
            const { visualizationsByPrograms } = prepareRows(
                visualizations,
                programList
            )
            setRows(visualizationsByPrograms)
            setInitialRows(visualizationsByPrograms)
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

            <AddNewSetting
                label={i18n.t('Add Program Visualization')}
                disable={disable}
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
