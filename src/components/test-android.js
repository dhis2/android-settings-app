import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import { Divider, Grid } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import TextFieldSearch from './text-field-search'

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
        console.log(
            'props testAndroid',
            props,
            props.states,
            props.states.TestAndroidContainer
        )
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
                    <TextFieldSearch
                        suggestions={this.props.suggestionsSearch}
                        checkUsername={this.props.checkUsername}
                        clearFields={this.props.clearSearchField}
                        suggestionPreSelected={this.props.searchFieldValue}
                    />

                    {this.props.runTest && (
                        <div className="data__top-margin">
                            {this.props.dataConstants.map(test => (
                                <div key={test.state}>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <small className="subitem-title">
                                                {test.title}
                                            </small>
                                            <p className="subitem-item">
                                                {test.description}
                                            </p>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Tooltip
                                                title={
                                                    this.props.states[
                                                        test.tooltipTitle
                                                    ]
                                                }
                                                placement="bottom"
                                            >
                                                <p className="subitem-item subitem-bigitem">
                                                    {
                                                        this.props.states[
                                                            test.state
                                                        ]
                                                    }
                                                </p>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={style.container}>
                        <Button
                            raised
                            style={style.button}
                            onClick={this.props.handleRun}
                            disabled={this.props.disabledTest}
                        >
                            RUN TEST
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TestAndroid
