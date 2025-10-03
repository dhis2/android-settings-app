import { Divider } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from '../../styles/TableSettings.module.css'
import TableRow from '../settingsTable/TableRow.jsx'

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
