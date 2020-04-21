import React from 'react'

import i18n from '@dhis2/d2-i18n'
import { AlertBar } from '@dhis2/ui-core'
import styles from '../../styles/AlertBar.module.css'

const SaveErrorAlert = ({ show }) => {
    return (
        <React.Fragment>
            {show && (
                <div className={styles.container_bottom}>
                    <AlertBar duration={8000} critical icon>
                        {i18n.t('Error when saving data')}
                    </AlertBar>
                </div>
            )}
        </React.Fragment>
    )
}

export default SaveErrorAlert
