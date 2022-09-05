import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { AlertBar } from '@dhis2/ui'
import styles from './AlertBar.module.css'

const ErrorAlert = ({ show }) => (
    <>
        {show && (
            <div className={styles.container_bottom}>
                <AlertBar duration={8000} critical icon>
                    {i18n.t('Failed to get data from Data Store')}
                </AlertBar>
            </div>
        )}
    </>
)

ErrorAlert.propTypes = {
    show: PropTypes.bool,
}

export default ErrorAlert
