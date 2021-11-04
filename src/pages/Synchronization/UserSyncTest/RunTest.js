import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import TestTable from './TestTable'
import { AddNewSetting } from '../../../components/field'

const RunTest = ({ disabled }) => {
    const [runTest, setRunTest] = useState(false)

    const testUser = () => {
        setRunTest(true)
    }

    return (
        <>
            {runTest && <TestTable />}

            <AddNewSetting
                label={i18n.t('Run test')}
                disable={disabled}
                onClick={testUser}
            />
        </>
    )
}

export default RunTest
