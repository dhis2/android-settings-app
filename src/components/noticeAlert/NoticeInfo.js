import React from 'react'
import PropTypes from 'prop-types'
import { NoticeBox } from '@dhis2/ui'
import styles from './NoticeAlert.module.css'

export const NoticeInfo = ({ title, notice }) => (
    <div className={styles.container}>
        <NoticeBox title={title} info>
            {notice}
        </NoticeBox>
    </div>
)

NoticeInfo.propTypes = {
    title: PropTypes.string,
    notice: PropTypes.string,
}
