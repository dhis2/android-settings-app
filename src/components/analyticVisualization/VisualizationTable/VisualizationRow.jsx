import i18n from '@dhis2/d2-i18n'
import { Button, ButtonStrip, IconArrowUp16, IconArrowDown16 } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './VisualizationTable.module.css'

export const VisualizationRow = ({
    visualizationList,
    deleteVisualization,
    editVisualization,
    orderVisualization,
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

                    <ButtonStrip>
                        <Button
                            small
                            secondary
                            onClick={() => {
                                orderVisualization({
                                    visualization,
                                    visualizationList,
                                    groupId,
                                    direction: 'up',
                                })
                            }}
                        >
                            <IconArrowUp16 />
                        </Button>
                        <Button
                            small
                            secondary
                            onClick={() => {
                                orderVisualization({
                                    visualization,
                                    visualizationList,
                                    groupId,
                                    direction: 'down',
                                })
                            }}
                        >
                            <IconArrowDown16 />
                        </Button>
                    </ButtonStrip>
                </ButtonStrip>
            </div>
        ))}
    </>
)

VisualizationRow.propTypes = {
    editVisualization: PropTypes.func,
    deleteVisualization: PropTypes.func,
    groupId: PropTypes.string,
    disabled: PropTypes.bool,
    visualizationList: PropTypes.array,
    orderVisualization: PropTypes.func,
}
