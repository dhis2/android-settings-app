import React from 'react'
import { NoticeBox } from '@dhis2/ui'

const NoticeAlert = ({ title, notice }) => (
    <div>
        <NoticeBox title={title} warning>
            {notice}
        </NoticeBox>
        <style jsx>
            {`
                 {
                    margin-bottom: 20px;
                }
            `}
        </style>
    </div>
)

export default NoticeAlert
