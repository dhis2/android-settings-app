import React from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { AlertBar } from '@dhis2/ui'
import styles from './AlertBar.module.css'

const SuccessAlert = ({ show }) => (
    <>
        {show && (
            <div className={styles.container_bottom}>
                <AlertBar duration={4000} icon success>
                    {i18n.t('Settings were successfully saved')}
                </AlertBar>
            </div>
        )}
    </>
)

SuccessAlert.propTypes = {
    show: PropTypes.bool,
}

export default SuccessAlert
