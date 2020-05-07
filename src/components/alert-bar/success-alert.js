import React from 'react'

import i18n from '@dhis2/d2-i18n'
import { AlertBar } from '@dhis2/ui-core'
import styles from '../../styles/AlertBar.module.css'

const SuccessAlert = ({ show }) => {
    return (
        <React.Fragment>
            {show && (
                <div className={styles.container_bottom}>
                    <AlertBar duration={4000} icon success>
                        {i18n.t('Settings were successfully saved')}
                    </AlertBar>
                </div>
            )}
        </React.Fragment>
    )
}

export default SuccessAlert
