import React from 'react'
import PropTypes from 'prop-types'
import { AlertBar } from '@dhis2/ui'
import styles from './AlertBar.module.css'

const SaveErrorAlert = ({ show, message }) => (
    <>
        {show && (
            <div className={styles.container_bottom}>
                <AlertBar duration={8000} critical icon>
                    {message}
                </AlertBar>
            </div>
        )}
    </>
)

SaveErrorAlert.propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string,
}

export default SaveErrorAlert
