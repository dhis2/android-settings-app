import i18n from '@dhis2/d2-i18n'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React from 'react'
import ContentMenuItem from './ContentMenuItem'

const ContentMenuGroup = ({ items, addItem }) => (
    <>
        {isEmpty(items) && (
            <ContentMenuItem name={i18n.t('No user found')} valid={false} />
        )}

        {items.map(item => (
            <ContentMenuItem
                key={item.id || item.key}
                onInsert={addItem(item)}
                name={item.name || item.displayName}
                valid={true}
            />
        ))}
    </>
)

ContentMenuGroup.propTypes = {
    items: PropTypes.array,
    addItem: PropTypes.func,
}

export default ContentMenuGroup
