import { IconInfo16, Divider, Tooltip } from '@dhis2/ui'
import React from 'react'
import styles from '../../styles/TableSettings.module.css'

function QuickActionsHeader() {
    return (
        <>
            <div className={styles.quickHeader}>
                <span> Display the actions as a chip</span>
                <Tooltip
                    content={
                        <img
                            src="android-quickactions.png"
                            alt="Tooltip Image"
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

export default QuickActionsHeader
