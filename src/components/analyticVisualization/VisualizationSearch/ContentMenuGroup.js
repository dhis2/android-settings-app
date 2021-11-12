import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { MenuItem } from '@dhis2/ui'
import { ContentMenuItem } from './ContentMenuItem'
import styles from './styles/ContentMenuGroup.module.css'

export const ContentMenuGroup = ({
    items,
    hasMore,
    onChangeItemsLimit,
    addItem,
}) => {
    const [seeMore, setSeeMore] = useState(false)

    const toggleSeeMore = () => {
        setSeeMore(!seeMore)
        onChangeItemsLimit(!seeMore)
    }

    return (
        <>
            {isEmpty(items) && (
                <ContentMenuItem
                    name={i18n.t('No visualization found')}
                    valid={false}
                />
            )}

            {items.map(item => (
                <ContentMenuItem
                    key={item.id || item.key}
                    name={item.displayName || item.name}
                    onInsert={addItem(item)}
                    type={item.type}
                    valid={item.valid}
                />
            ))}

            {hasMore && (
                <MenuItem
                    dense
                    onClick={toggleSeeMore}
                    label={
                        <button className={styles.showMoreButton}>
                            {seeMore
                                ? i18n.t('Show fewer')
                                : i18n.t('Show more')}
                        </button>
                    }
                />
            )}
        </>
    )
}

ContentMenuGroup.propTypes = {
    items: PropTypes.array,
    hasMore: PropTypes.bool,
    onChangeItemsLimit: PropTypes.func,
    addItem: PropTypes.func,
}
