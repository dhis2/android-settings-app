import i18n from '@dhis2/d2-i18n'
import { Divider, IconChevronRight24 } from '@dhis2/ui'
import cx from 'classnames'
import React, { useState } from 'react'
import styles from './MoreOptions.module.css'

const AdvancedSettings = () => {
    return <></>
}

export const MoreOptions = ({
    children,
    initiallyVisible,
    noBottomMargin,
    dataTest = 'interaction-more-options',
}) => {
    const [hidden, setHidden] = useState(!initiallyVisible)

    const onToggle = () => {
        setHidden(!hidden)
    }

    return (
        <section
            className={cx({ [styles.container]: !noBottomMargin })}
            data-test={dataTest}
        >
            <header
                className={styles.header}
                onClick={onToggle}
                data-test={`${dataTest}-header`}
            >
                <div
                    className={cx({
                        [styles.chevronHidden]: hidden,
                        [styles.chevronVisible]: !hidden,
                    })}
                >
                    <IconChevronRight24 />
                </div>
                <h2 className={styles.label}>{i18n.t('Advanced options')}</h2>
            </header>
            {!hidden && <Divider />}
            <div className={styles.children} data-test={`${dataTest}-children`}>
                {!hidden && children}
            </div>
        </section>
    )
}
