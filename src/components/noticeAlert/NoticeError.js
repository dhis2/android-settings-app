import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './NoticeAlert.module.css'

export const NoticeError = ({ title, notice }) => (
    <div className={styles.container}>
        <NoticeBox title={title} error>
            {notice}
        </NoticeBox>
    </div>
)

NoticeError.propTypes = {
    title: PropTypes.string,
    notice: PropTypes.string,
}
