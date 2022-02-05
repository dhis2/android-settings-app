import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { CircularLoader } from '@dhis2/ui'
import NewHomeVisualization from './NewHomeVisualization'
import { HomeVisualizationTable } from '../../../components/analyticVisualization'
import { NoticeError } from '../../../components/noticeAlert'
import { useVisualizations } from '../VisualizationQuery'
import { createRows, getVisualizationIdList } from './helper'

const HomeAnalyticList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const {
        loading,
        error,
        visualizations: visualizationAPI,
    } = useVisualizations(getVisualizationIdList(visualizations))
    const [rows, setRows] = useState([])
    const [initialRows, setInitialRows] = useState([])

    useEffect(() => {
        if (!isEmpty(visualizations) && visualizationAPI) {
            const homeVisualizations = createRows(
                visualizations,
                visualizationAPI
            )
            setRows(homeVisualizations)
            setInitialRows(homeVisualizations)
        }
    }, [visualizations, visualizationAPI])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            handleVisualizations(createRows(rows))
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
