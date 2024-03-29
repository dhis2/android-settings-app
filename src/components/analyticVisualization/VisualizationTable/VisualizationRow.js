import i18n from '@dhis2/d2-i18n'
import { Button, ButtonStrip } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './VisualizationTable.module.css'

export const VisualizationRow = ({
    visualizationList,
    deleteVisualization,
    editVisualization,
    groupId,
    disabled,
}) => (
    <>
        {visualizationList.map((visualization) => (
            <div
                className={cx([styles.boxContainer, styles.rowContainer])}
                key={visualization.id}
            >
                <p> {visualization.name || visualization.visualizationName} </p>
                <ButtonStrip>
                    <Button
                        small
                        secondary
                        onClick={() => {
                            editVisualization(
                                visualization,
                                visualizationList,
                                groupId
                            )
                        }}
                        disabled={disabled}
                    >
                        {i18n.t('Edit')}
                    </Button>
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
                </ButtonStrip>
            </div>
        ))}
    </>
)

VisualizationRow.propTypes = {
    visualizations: PropTypes.array,
    editVisualization: PropTypes.func,
    deleteVisualization: PropTypes.func,
    groupId: PropTypes.string,
    disabled: PropTypes.bool,
}
