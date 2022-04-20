import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from '@dhis2/ui'
import TableRow from '../settingsTable/TableRow'
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
