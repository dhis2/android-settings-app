import React from 'react'

import PropTypes from '@dhis2/prop-types'
import { AlertBar } from '@dhis2/ui-core'
import styles from '../../styles/AlertBar.module.css'

const SaveErrorAlert = ({ show, message }) => {
    return (
        <React.Fragment>
            {show && (
                <div className={styles.container_bottom}>
                    <AlertBar duration={8000} critical icon>
                        {message}
                    </AlertBar>
                </div>
            )}
        </React.Fragment>
    )
}

SaveErrorAlert.propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string,
}

export default SaveErrorAlert
