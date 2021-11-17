import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { Button, Divider, Field, FieldSet, Legend } from '@dhis2/ui'
import isEmpty from 'lodash/isEmpty'
import ItemSelector from './ItemSelector'
import { useReadVisualizationsQuery } from './visualizationQuery'
import { validateUserVisualization } from './helper'
import styles from './styles/VisualizationUserTest.module.css'

export const VisualizationUserTest = ({ visualization, visualizationName }) => {
    const { data } = useReadVisualizationsQuery({
        visualizationId: visualization,
    })
    const [user, setUser] = useState()
    const [isValid, setValid] = useState(false)
    const [tested, setTesting] = useState(false)

    useEffect(() => {
        isEmpty(user) && setTesting(false)
    }, [user])

    const handleChange = () => {
        setValid(validateUserVisualization(user, data.visualizations))
        setTesting(true)
    }

    const getTestingResults = () =>
        isValid ? (
            <p className={styles.result}>
                {i18n.t(
                    '{{userName}} can visualize {{visualization}} visualization',
                    {
                        userName: user.name || user.displayName,
                        visualization: visualizationName,
                    }
                )}
            </p>
        ) : (
            <p className={styles.result}>
                {i18n.t(
                    '{{userName}} can not visualize {{visualization}} visualization',
                    {
                        userName: user.name || user.displayName,
                        visualization: visualizationName,
                    }
                )}
            </p>
        )

    return (
        <>
            <Divider margin="30px 0px 10px 0px" />
            <FieldSet>
                <Legend className={styles.legendTitle}>
                    {i18n.t('Visualization user test')}
                </Legend>

                <ItemSelector selection={setUser} />

                {tested && getTestingResults()}

                <Field className={styles.runTest}>
                    <Button small onClick={handleChange}>
                        {i18n.t('Run test')}
                    </Button>
                </Field>
            </FieldSet>
        </>
    )
}

VisualizationUserTest.propTypes = {
    visualization: PropTypes.string,
    visualizationName: PropTypes.string,
}
