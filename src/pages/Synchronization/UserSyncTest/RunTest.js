import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { useDataEngine } from '@dhis2/app-runtime'
import TestTable from './TestTable'
import { AddNewSetting } from '../../../components/field'
import { useReadSettings } from './queries/userSyncQueries'
import { runUserTest, createInitialValues } from './helper'

const RunTest = ({ disabled, user }) => {
    const dataEngine = useDataEngine()
    const {
        reservedValues,
        globalSettings,
        specificSettings,
    } = useReadSettings()
    const [runTest, setRunTest] = useState(false)
    const [loading, setLoad] = useState(true)
    const [userTestValues, setValues] = useState(createInitialValues(''))

    useEffect(() => {
        isEmpty(user) && setValues(createInitialValues(''))
    }, [user])

    const testUser = () => {
        setRunTest(true)
        setLoad(true)
        runUserTest({
            user,
            dataEngine,
            reservedValues,
            globalSettings,
            specificSettings,
        }).then(result => {
            setValues(createInitialValues(result))
            setLoad(false)
        })
    }

    return (
        <>
            {runTest && <TestTable loading={loading} state={userTestValues} />}

            <AddNewSetting
                label={i18n.t('Run test')}
                disable={disabled}
                onClick={testUser}
            />
        </>
    )
}

RunTest.propTypes = {
    disabled: PropTypes.bool,
    user: PropTypes.object,
}

export default RunTest
