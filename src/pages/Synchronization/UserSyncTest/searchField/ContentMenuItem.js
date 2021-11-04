import React from 'react'
import { MenuItem } from '@dhis2/ui'
import PropTypes from 'prop-types'

const ContentMenuItem = ({ name, onInsert }) => (
    <MenuItem onClick={onInsert} label={name} dataTest={`menu-item-${name}`} />
)

ContentMenuItem.propTypes = {
    name: PropTypes.string,
    onInsert: PropTypes.func,
}

export default ContentMenuItem
