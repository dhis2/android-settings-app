import { IconInfo16, Divider } from '@dhis2/ui'
import React from 'react'
import styles from '../../styles/TableSettings.module.css'

function QuickActionsHeader() {
    return (
        <>
            <div className={styles.quickHeader}>
                <span> Display the actions as a chip</span>
                <IconInfo16 />
            </div>
            <Divider />
        </>
    )
}

export default QuickActionsHeader
