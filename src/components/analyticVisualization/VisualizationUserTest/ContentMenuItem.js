import React from 'react'
import { MenuItem } from '@dhis2/ui'
import PropTypes from 'prop-types'

const ContentMenuItem = ({ name, addItem, valid }) => (
    <MenuItem
        dense
        onClick={addItem}
        label={name}
        dataTest={`menu-item-${name}`}
        disabled={!valid}
    />
)

ContentMenuItem.propTypes = {
    name: PropTypes.string,
    addItem: PropTypes.func,
    valid: PropTypes.bool,
}

export default ContentMenuItem
