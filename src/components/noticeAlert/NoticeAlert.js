import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
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
