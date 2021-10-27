import React from 'react'
import PropTypes from '@dhis2/prop-types'
import cx from 'classnames'
import style from '../../styles/Disable.module.css'
import { Divider } from '@dhis2/ui'
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
