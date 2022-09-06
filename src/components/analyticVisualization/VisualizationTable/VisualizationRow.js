import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './VisualizationTable.module.css'

export const VisualizationRow = ({
    visualizationList,
    deleteVisualization,
    groupId,
    disabled,
}) => (
    <>
        {visualizationList.map(visualization => (
            <div
                className={cx([styles.boxContainer, styles.rowContainer])}
                key={visualization.id}
            >
                <p> {visualization.name || visualization.visualizationName} </p>
                <div>
                    <Button
                        small
                        secondary
                        onClick={() => {
                            deleteVisualization(
                                visualization,
                                visualizationList,
                                groupId
                            )
                        }}
                        disabled={disabled}
                    >
                        {i18n.t('Delete')}
                    </Button>
                </div>
            </div>
        ))}
    </>
)

VisualizationRow.propTypes = {
    visualizations: PropTypes.array,
    deleteVisualization: PropTypes.func,
    groupId: PropTypes.string,
    disabled: PropTypes.bool,
}
