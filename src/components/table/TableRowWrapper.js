import React from 'react'
import PropTypes from '@dhis2/prop-types'
import cx from 'classnames'
import style from '../../styles/Disable.module.css'
import { Divider } from '@dhis2/ui'
import { TableRow } from './TableRow'

export const TableRowWrapper = ({ row, disable, children }) => (
    <>
        <TableRow>
            <>
                <div className={cx({ [style.disable_label]: disable })}>
                    {row.label}
                </div>
                <div>{children}</div>
            </>
        </TableRow>
        <Divider />
    </>
)

TableRowWrapper.propTypes = {
    row: PropTypes.object,
    disable: PropTypes.bool,
    children: PropTypes.element,
}
