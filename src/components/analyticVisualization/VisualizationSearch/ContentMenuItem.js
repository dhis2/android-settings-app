import React from 'react'
import { MenuItem, colors } from '@dhis2/ui'
import PropTypes from 'prop-types'
import { getVisualizationIcon } from './visualizationTypes'

export const ContentMenuItem = ({ type, name, onInsert, valid }) => {
    const ItemIcon = getVisualizationIcon(type)
    const renderedItemIcon = <ItemIcon color={colors.grey600} />

    return (
        <MenuItem
            onClick={onInsert}
            icon={renderedItemIcon}
            label={name}
            dataTest={`menu-item-${name}`}
            disabled={!valid}
        />
    )
}

ContentMenuItem.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    onInsert: PropTypes.func,
    valid: PropTypes.bool,
}
