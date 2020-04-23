import React from 'react'

import { Button, CircularLoader } from '@dhis2/ui-core'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import TextFieldSearch from '../../text-field-search'
import i18n from '@dhis2/d2-i18n'
import titleStyles from '../../../styles/LayoutTitles.module.css'
import buttonStyles from '../../../styles/Button.module.css'
import itemStyles from '../../../styles/TestAndroidTable.module.css'
import layoutStyles from '../../../styles/Layout.module.css'
import { testAndroidDataConstants } from '../../../constants/test-android'

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
                        {i18n.t('User sync test')}
                    </p>
                    <p className={titleStyles.mainContent__subtitle}>
                        {i18n.t(
                            'Check the amount of data a user would sync to their device.'
                        )}
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
                            {testAndroidDataConstants.map(test => (
                                <div key={test.state}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            {this.props[test.load] === true ? (
                                                <CircularLoader small />
                                            ) : (
                                                <p
                                                    className={`${
                                                        itemStyles.subItemBigItem
                                                    } ${
                                                        this.props.states[
                                                            test.state
                                                        ] >=
                                                        this.props.states[
                                                            test.maxValueState
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
                                            )}
                                        </Grid>
                                        <Grid
                                            item
                                            xs={10}
                                            className={
                                                itemStyles.container_center
                                            }
                                        >
                                            <div
                                                className={
                                                    itemStyles.container_items
                                                }
                                            >
                                                <p
                                                    className={
                                                        itemStyles.subItemTitle
                                                    }
                                                >
                                                    {test.title}
                                                </p>
                                                <p
                                                    className={
                                                        itemStyles.subItemItem
                                                    }
                                                >
                                                    {i18n.t(
                                                        'Recommended maximum: '
                                                    )}{' '}
                                                    {test.maxValue}
                                                </p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </div>
                            ))}
                        </div>
                    )}

                    <Button
                        className={buttonStyles.button__add}
                        onClick={this.props.handleRun}
                        disabled={this.props.disabledTest}
                    >
                        {i18n.t('Run test')}
                    </Button>
                </div>
            </div>
        )
    }
}

export default TestAndroid
