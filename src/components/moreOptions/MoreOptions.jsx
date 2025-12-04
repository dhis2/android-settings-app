import i18n from '@dhis2/d2-i18n'
import { Divider, IconChevronRight24 } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styles from './MoreOptions.module.css'

export const MoreOptions = ({
    children,
    initiallyVisible,
    dataTest = 'interaction-more-options',
}) => {
    const [hidden, setHidden] = useState(!initiallyVisible)

    const onToggle = () => {
        setHidden(!hidden)
    }

    return (
        <section className={styles.container} data-test={dataTest}>
            <header
                className={styles.headerContainer}
                data-test={`${dataTest}-header`}
            >
                <button
                    type="button"
                    onClick={onToggle}
                    className={styles.header}
                    data-test={`${dataTest}-header`}
                    aria-expanded={!hidden}
                    aria-controls={`${dataTest}-children`}
                >
                    <div
                        className={cx({
                            [styles.chevronHidden]: hidden,
                            [styles.chevronVisible]: !hidden,
                        })}
                    >
                        <IconChevronRight24 />
                    </div>
                    <h2 className={styles.label}>
                        {i18n.t('Opt-in Features')}
                    </h2>
                </button>
            </header>
            {!hidden && <Divider />}
            <div
                className={styles.children}
                id={`${dataTest}-children`}
                data-test={`${dataTest}-children`}
            >
                {!hidden && children}
            </div>
        </section>
    )
}

MoreOptions.propTypes = {
    children: PropTypes.element,
    initiallyVisible: PropTypes.bool,
    dataTest: PropTypes.string,
}
