import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { AddNewSetting } from '../../../components/field'
import { runUserTest, createInitialValues } from './helper'
import { useReadSettings } from './queries/userSyncQueries'
import TestTable from './TestTable'

const RunTest = ({ disabled, user }) => {
    const dataEngine = useDataEngine()
    const { reservedValues, globalSettings, specificSettings } =
        useReadSettings()
    const [runTest, setRunTest] = useState(false)
    const [loading, setLoad] = useState(false)
    const [userTestValues, setValues] = useState(createInitialValues(''))

    useEffect(() => {
        if (isEmpty(user)) {
            setValues(createInitialValues(''))
            setRunTest(false)
        }
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
        }).then((result) => {
            setValues(createInitialValues(result))
            setLoad(false)
        })
    }

    return (
        <>
            {runTest && <TestTable loading={loading} state={userTestValues} />}

            <AddNewSetting
                label={i18n.t('Run test')}
                disable={disabled || loading}
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
