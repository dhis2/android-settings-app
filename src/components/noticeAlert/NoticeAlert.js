import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { NoticeBox } from '@dhis2/ui'
import styles from './NoticeAlert.module.css'

const NoticeAlert = ({ title, notice }) => (
    <div className={styles.container}>
        <NoticeBox title={title} warning>
            {notice}
        </NoticeBox>
    </div>
)

NoticeAlert.propTypes = {
    title: PropTypes.string,
    notice: PropTypes.string,
}

export default NoticeAlert
