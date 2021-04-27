import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { Divider } from '@dhis2/ui'
import TableRow from '../settings-table/table-row'
import styles from '../../styles/TableSettings.module.css'

export const TableHeader = ({ title }) => (
    <>
        <TableRow>
            <div />
            <div className={styles.title}>{title}</div>
        </TableRow>
        <Divider />
    </>
)

TableHeader.propTypes = {
    title: PropTypes.string,
}
