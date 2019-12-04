import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import { Divider, Grid } from '@material-ui/core'
// import { CircularProgress } from '@dhis2/d2-ui-core'
import Tooltip from '@material-ui/core/Tooltip'
import style from '../styles/settings.style'
import TextFieldSearch from './text-field-search'

const inlineStyle = {
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
        this.TestAndroid = props
    }

    render() {
        return (
            <div>
                <div>
                    <p style={style.mainContent__title__main}>
                        Test Android Login
                    </p>
                    <p style={style.mainContent__subtitle}>
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

                    {/* {this.props.loadData && (
                        <div>
                            <CircularProgress small />
                            <div>
                                {this.props.orgUnitLoad && (
                                    <p className="subitem-item">
                                        Invoking Organization Units capture
                                    </p>
                                )}
                                {this.props.dataSetLoad && (
                                    <p className="subitem-item">
                                        Invoking Data sets associated to OU
                                    </p>
                                )}
                                {this.props.programLoad && (
                                    <p className="subitem-item">
                                        Invoking Program associated to OU
                                    </p>
                                )}
                                {this.props.programRuleLoad && (
                                    <p className="subitem-item">
                                        Invoking Program rules associated to OU
                                    </p>
                                )}
                                {this.props.metadataLoad && (
                                    <p className="subitem-item">
                                        Invoking Metadata download size
                                    </p>
                                )}
                            </div>
                        </div>
                    )} */}

                    {this.props.runTest && (
                        <div style={style.data__topMargin}>
                            {this.props.dataConstants.map(test => (
                                <div key={test.state}>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <small style={style.subitemTitle}>
                                                {test.title}
                                            </small>
                                            <p style={style.subitemItem}>
                                                {test.description}
                                            </p>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {this.props[test.load] === true ? (
                                                <p className="subitem-item subitem-bigitem">
                                                    Invoking ...
                                                </p>
                                            ) : (
                                                <Tooltip
                                                    title={
                                                        this.props.states[
                                                            test.tooltipTitle
                                                        ]
                                                    }
                                                    placement="bottom"
                                                >
                                                    <p
                                                        className={`subitem-item subitem-bigitem ${
                                                            this.props.states[
                                                                test.state
                                                            ] >=
                                                            this.props.states[
                                                                test
                                                                    .maxValueState
                                                            ]
                                                                ? 'max-value'
                                                                : ''
                                                        }`}
                                                    >
                                                        {
                                                            this.props.states[
                                                                test.state
                                                            ]
                                                        }
                                                    </p>
                                                </Tooltip>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={inlineStyle.container}>
                        <Button
                            raised
                            style={inlineStyle.button}
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
