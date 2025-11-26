import { IconInfo16, Divider, Tooltip } from '@dhis2/ui'
import React from 'react'
import androidQuickActions from '../../img/android-quick-actions.png'
import styles from '../../styles/TableSettings.module.css'

export const QuickActionsHeader = () => {
    return (
        <>
            <div className={styles.quickHeader}>
                <span> Display the actions as a chip</span>
                <Tooltip
                    content={
                        <img
                            src={androidQuickActions}
                            style={{ width: '500px', height: '500px' }}
                        />
                    }
                    placement="top"
                    className={styles.quickHeaderTooltip}
                >
                    <IconInfo16 />
                </Tooltip>
            </div>
            <Divider />
        </>
    )
}
