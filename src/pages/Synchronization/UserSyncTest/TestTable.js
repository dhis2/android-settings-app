import React from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'
import {
    DataTable,
    TableBody,
    DataTableRow,
    DataTableCell,
    CircularLoader,
} from '@dhis2/ui'
import { testAndroidDataConstants } from '../../../constants/test-android'
import classes from './TestTable.module.css'

const TestResult = ({ load, state, test }) => (
    <>
        {load ? (
            <CircularLoader small />
        ) : (
            <p
                className={cx(classes.subItemTitle, {
                    [classes.maxValue]:
                        state[test.state] >= state[test.maxValueState],
                })}
            >
                {state[test.state]}
            </p>
        )}
    </>
)

const TestRow = ({ test }) => (
    <DataTableRow>
        <DataTableCell large className={classes.tableCell}>
            20
        </DataTableCell>
        <DataTableCell large className={classes.tableCell}>
            {test.title}
        </DataTableCell>
        <DataTableCell large className={classes.tableCell}>
            {i18n.t('Recommended maximum: {{maxValue}}', {
                nsSeparator: '---',
                maxValue: test.maxValue,
            })}
        </DataTableCell>
    </DataTableRow>
)

const TestTable = () => {
    return (
        <div className={classes.topMargin}>
            <DataTable className={classes.table}>
                <TableBody>
                    {testAndroidDataConstants.map(test => (
                        <TestRow test={test} key={test.state} />
                    ))}
                </TableBody>
            </DataTable>
        </div>
    )
}

export default TestTable
