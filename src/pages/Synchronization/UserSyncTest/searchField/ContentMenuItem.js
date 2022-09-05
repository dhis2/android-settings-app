import React from 'react'
import { MenuItem } from '@dhis2/ui'
import PropTypes from 'prop-types'

const ContentMenuItem = ({ name, onInsert, valid }) => (
    <MenuItem
        onClick={onInsert}
        label={name}
        dataTest={`menu-item-${name}`}
        disabled={!valid}
    />
)

ContentMenuItem.propTypes = {
    name: PropTypes.string,
    onInsert: PropTypes.func,
    valid: PropTypes.bool,
}

export default ContentMenuItem
