import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

class ProgramTable extends React.Component {
    constructor(props) {
        super(props)
        console.log('props table', props)
    }

    render() {
        return (
            <Table className="data-table">
                <TableHead>
                    <TableRow>
                        <TableCell className="data-table__headers__header">
                            {' '}
                        </TableCell>
                        <TableCell
                            className="data-table__headers__header"
                            align="right"
                        >
                            Download
                        </TableCell>
                        <TableCell
                            className="data-table__headers__header"
                            align="right"
                        >
                            DB trimming
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="data-table__rows">
                    {this.props.data.map(row => (
                        <TableRow key={row.option}>
                            <TableCell
                                component="th"
                                scope="row"
                                className="data-table__rows__row__column"
                            >
                                {row.option}
                            </TableCell>
                            <TableCell
                                align="right"
                                className="data-table__rows__row__column"
                            >
                                {Array.isArray(row.download) === true ? (
                                    <Select
                                        key={row.keyDownload}
                                        value={
                                            this.props.states[row.keyDownload]
                                        }
                                        onChange={this.props.onChange}
                                        id={row.keyDownload}
                                        name={row.keyDownload}
                                    >
                                        {row.download.map(option => (
                                            <MenuItem
                                                value={option.value}
                                                key={option.value}
                                                name={option.value}
                                            >
                                                <em> {option.label} </em>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                ) : (
                                    <TextField
                                        id={row.keyDownload}
                                        name={row.keyDownload}
                                        type="number"
                                        margin="normal"
                                        value={
                                            this.props.states[row.keyDownload]
                                        }
                                        onChange={this.props.onChange}
                                    />
                                )}
                            </TableCell>
                            <TableCell
                                align="right"
                                className="data-table__rows__row__column"
                            >
                                {Array.isArray(row.DBTrimming) === true ? (
                                    <Select
                                        key={row.keyDBTrimming}
                                        value={
                                            this.props.states[row.keyDBTrimming]
                                        }
                                        onChange={this.props.onChange}
                                        id={row.keyDBTrimming}
                                        name={row.keyDBTrimming}
                                    >
                                        {row.DBTrimming.map(option => (
                                            <MenuItem
                                                value={option.value}
                                                key={option.value}
                                                name={option.value}
                                            >
                                                <em> {option.label} </em>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                ) : (
                                    <TextField
                                        id={row.keyDBTrimming}
                                        name={row.keyDBTrimming}
                                        type="number"
                                        margin="normal"
                                        value={
                                            this.props.states[row.keyDBTrimming]
                                        }
                                        onChange={this.props.onChange}
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }
}

export default ProgramTable
