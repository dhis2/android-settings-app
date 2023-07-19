import { Divider } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import style from '../../styles/Disable.module.css'
import { TableRow } from './TableRow'

export const TableRowWrapper = ({ label, disable, dense, children }) => (
    <>
        <TableRow dense={dense}>
            <>
                <div className={cx({ [style.disable_label]: disable })}>
                    {label}
                </div>
                <div>{children}</div>
            </>
        </TableRow>
        <Divider />
    </>
)

TableRowWrapper.propTypes = {
    label: PropTypes.string,
    disable: PropTypes.bool,
    dense: PropTypes.bool,
    children: PropTypes.element,
}
