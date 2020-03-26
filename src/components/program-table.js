import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import SettingsTableRow from './setting-table-row'
import { WITH_REGISTRATION } from '../constants/program-settings'

import i18n from '@dhis2/d2-i18n'
import dataTableStyles from '../styles/DataTable.module.css'

class ProgramTable extends React.Component {
    constructor(props) {
        super(props)
        this.programTable = props

        this.state = {
            programSelected: this.props.programSelected,
            programFilter: '',
            programType: '',
        }
    }

    checkProgramType = () => {
        if (this.props.programSelected !== '') {
            const programSelected = this.props.completeListOptions.filter(
                program => program.id === this.props.programSelected
            )
            this.programFilter = programSelected[0]
            this.setState({
                programSelected: this.props.programSelected,
                programFilter: programSelected,
                programType: this.programFilter.programType,
            })
        }
    }

    componentDidUpdate() {
        if (this.props.programSelected !== '') {
            if (!this.state.programSelected) {
                this.checkProgramType()
            } else if (
                this.state.programSelected !== this.props.programSelected
            ) {
                this.checkProgramType()
            } else if (!this.state.programType) {
                this.checkProgramType()
            }
        }
    }

    render() {
        if (this.props.programSelected === '') {
            return null
        }

        if (this.state.programSelected || this.state.programType) {
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
                    <TableBody className="data-table__rows">
                        {this.state.programType === WITH_REGISTRATION
                            ? this.props.data.withRegistration.map(row => (
                                  <SettingsTableRow
                                      key={row.option}
                                      dataRow={row}
                                      states={this.props.states}
                                      onChange={this.props.onChange}
                                  />
                              ))
                            : this.props.data.withoutRegistration.map(row => (
                                  <SettingsTableRow
                                      key={row.option}
                                      dataRow={row}
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

export default ProgramTable
