import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DataSetTableRow from './dataset-table-row'

import i18n from '@dhis2/d2-i18n'
import dataTableStyles from '../../styles/DataTable.module.css'
import { periodTypeConstants } from '../../constants/data-set-settings'

class DataSetTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dataSetSelected: this.props.dataSetSelected,
            dataSetFilter: '',
            periodType: '',
            defaultValue: '',
            selected: false,
        }
    }

    checkPeriodType = () => {
        if (this.props.dataSetSelected !== '') {
            const dataSetSelected = this.props.completeListOptions.filter(
                dataSet => dataSet.id === this.props.dataSetSelected
            )
            this.dataSetFilter = dataSetSelected[0]

            this.props.states.periodDSDownload =
                periodTypeConstants[dataSetSelected[0].periodType].default

            this.setState({
                dataSetSelected: this.props.dataSetSelected,
                dataSetFilter: dataSetSelected,
                periodType: this.dataSetFilter.periodType,
                defaultValue:
                    periodTypeConstants[dataSetSelected[0].periodType].default,
                selected: true,
            })
        }
    }

    checkPeriodTypeEdit = () => {
        if (this.props.dataSetSelected !== '') {
            const dataSetSelected = this.props.completeListOptions.filter(
                dataSet => dataSet.id === this.props.dataSetSelected
            )
            this.dataSetFilter = dataSetSelected[0]

            this.setState({
                dataSetSelected: this.props.dataSetSelected,
                dataSetFilter: dataSetSelected,
                periodType: this.dataSetFilter.periodType,
                defaultValue:
                    periodTypeConstants[dataSetSelected[0].periodType].default,
                selected: true,
            })
        }
    }

    componentDidUpdate() {
        if (this.props.dataSetSelected !== '') {
            if (!this.state.dataSetSelected) {
                this.checkPeriodType()
            } else if (
                this.state.dataSetSelected !== this.props.dataSetSelected
            ) {
                this.checkPeriodType()
            } else if (!this.state.periodType) {
                this.checkPeriodTypeEdit()
            }
        }
    }

    render() {
        if (this.props.dataSetSelected === '') {
            return null
        }

        if (this.state.dataSetSelected || this.state.periodType) {
            return (
                <Table className={dataTableStyles.dataTable}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className={
                                    dataTableStyles.dataTable__headers__header
                                }
                            >
                                {' '}
                            </TableCell>
                            <TableCell
                                className={
                                    dataTableStyles.dataTable__headers__header
                                }
                                align="right"
                            >
                                {i18n.t('Download')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data.map(row => (
                            <DataSetTableRow
                                key={row.option}
                                dataRow={row}
                                periodType={this.state.periodType}
                                defaultValue={this.state.defaultValue}
                                states={this.props.states}
                                onChange={this.props.onChange}
                            />
                        ))}
                    </TableBody>
                </Table>
            )
        }

        return null
    }
}

export default DataSetTable
