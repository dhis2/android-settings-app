import React from 'react'
import { Button } from '@dhis2/d2-ui-core'
import TextField from '@material-ui/core/TextField'
import { Divider } from '@material-ui/core'

const style = {
    button: {
        margin: '20px 0px 10px 0px',
    },
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}

class TestAndroid extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    state = {
        username: '',
        runTest: false,
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
    }

    handleRun = () => {
        console.log('run')
        this.setState({
            runTest: true,
        })
    }

    render() {
        return (
            <div>
                <div>
                    <p className="main-content__title main-content__title__main">
                        Test Android Login
                    </p>
                    <p className="main-content__title main-content__subtitle">
                        Enter a user to check access to
                    </p>
                </div>

                <div>
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.username}
                        onChange={this.handleChange}
                    />

                    {this.state.runTest && (
                        <div className="data__top-margin">
                            <div>
                                <small className="subitem-title">
                                    {' '}
                                    Org Units capture{' '}
                                </small>
                                <p className="subitem-item">
                                    {' '}
                                    Number of org unit that are available for
                                    data capture{' '}
                                </p>
                            </div>
                            <Divider />
                            <div>
                                <small className="subitem-title">
                                    {' '}
                                    Data sets associated to OU capture of user{' '}
                                </small>
                                <p className="subitem-item">
                                    {' '}
                                    Number of datasets associated to capture OUs{' '}
                                </p>
                            </div>
                            <Divider />
                            <div>
                                <small className="subitem-title">
                                    {' '}
                                    Average/total data cells{' '}
                                </small>
                                <p className="subitem-item">
                                    {' '}
                                    Number of data entry cells for all datasets/
                                    data elements/ cat combos{' '}
                                </p>
                            </div>
                        </div>
                    )}

                    <div style={style.container}>
                        <Button
                            raised
                            style={style.button}
                            onClick={this.handleRun}
                        >
                            {' '}
                            RUN TEST{' '}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TestAndroid

/*  < Table className = "data-table" >
        <TableBody className="data-table__rows">
            <TableRow>
                <TableCell></TableCell>
            </TableRow>
        </TableBody>
                    </Table > */
