import React from 'react'

import { Button } from '@dhis2/ui-core'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'

import TextFieldSearch from './text-field-search'
import i18n from '@dhis2/d2-i18n'
import titleStyles from '../styles/LayoutTitles.module.css'
import buttonStyles from '../styles/Button.module.css'
import itemStyles from '../styles/TestAndroidTable.module.css'
import layoutStyles from '../styles/Layout.module.css'

class TestAndroid extends React.Component {
    constructor(props) {
        super(props)
        this.TestAndroid = props
    }

    render() {
        return (
            <div>
                <div>
                    <p className={titleStyles.mainContent__title__main}>
                        {i18n.t('Test Android Sync')}
                    </p>
                    <p className={titleStyles.mainContent__subtitle}>
                        {i18n.t('Enter a user to check access to')}
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
                        <div className={layoutStyles.data__topMargin}>
                            {this.props.dataConstants.map(test => (
                                <div key={test.state}>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <small
                                                className={
                                                    itemStyles.subitemTitle
                                                }
                                            >
                                                {test.title}
                                            </small>
                                            <p
                                                className={
                                                    itemStyles.subitemItem
                                                }
                                            >
                                                {test.description}
                                            </p>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {this.props[test.load] === true ? (
                                                <p
                                                    className={
                                                        itemStyles.subitemBigitem
                                                    }
                                                >
                                                    {i18n.t('Invoking ...')}
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
                                                        className={`${
                                                            itemStyles.subitemBigitem
                                                        } ${
                                                            this.props.states[
                                                                test.state
                                                            ] >=
                                                            this.props.states[
                                                                test
                                                                    .maxValueState
                                                            ]
                                                                ? itemStyles.maxValue
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

                    <div className={buttonStyles.container_button__add}>
                        <Button
                            className={buttonStyles.button__add}
                            onClick={this.props.handleRun}
                            disabled={this.props.disabledTest}
                        >
                            {i18n.t('RUN TEST')}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TestAndroid
