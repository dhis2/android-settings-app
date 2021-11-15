import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { HomeVisualizationTable } from '../../../components/analyticVisualization'
import { AddNewSetting } from '../../../components/field'

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

            <AddNewSetting
                label={i18n.t('Add Home Visualization')}
                disable={disable}
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
