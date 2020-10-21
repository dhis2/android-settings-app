import React, { useEffect, useState } from 'react'

import { useConfig } from '@dhis2/app-runtime'
import TestAndroid from './test-android'
import { formatByteSize, memorySizeOf } from '../../../utils/memory-size'

import api from '../../../utils/api'
import { getDownloadSize } from '../../../modules/userSyncTest/downloadSize'
import { splitArray } from '../../../modules/splitArray'
import { prepareDataSizeRequest } from '../../../modules/userSyncTest/prepareDataSizeRequest'
import { testAndroidDataConstants } from '../../../constants/test-android'
import { prepareMetadataRequest } from '../../../modules/userSyncTest/prepareMetadataSizeRequest'
import SectionWrapper from '../section-wrapper'
import { getRequestDownloadSize } from '../../../utils/getRequestDownloadSize'

import prepareInitialData from '../../../modules/userSyncTest/prepareInitialData'
import getUserDataSyncTest from '../../../modules/userSyncTest/getUserDataSyncTest'
import { useOrganisationUnitCapture } from '../../../modules/query/useOrganisationUnit'
import fetchAttributes from '../../../utils/fetchAttributes'

const state = {
    //username: '',
    //runTest: false,
    //loading: true,
    //disabled: true,
    loadData: false,
    errorUsername: false,

    // organisationUnitsNumber: 0,
    // organisationUnitSearchNumber: 0,
    // datasetNumber: 0,
    // programNumber: 0,
    // programRuleNumber: 0,
    // metadataSize: 0,
    // dataSize: 0,

    //maxValueOUCapture: 0,
    //maxValueOUSearch: 0,
    //maxValueDataSet: 0,
    //maxValueProgram: 0,
    //maxValueProgramRule: 0,
    //maxValueMetadata: 0,
    //maxValueData: 0,

    // orgUnitLoad: false,
    // dataSetLoad: false,
    // programLoad: false,
    // programRuleLoad: false,
    // metadataLoad: false,
    // dataLoad: false,

    //reservedValueNumber: 0,
    //maxValueReservedValue: 0,
    //reservedValuesLoad: false,
}

const UserSyncTestContainer = () => {
    const { baseUrl } = useConfig()
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true)
    const [runTestDisabled, setRunTestDisable] = useState(true)
    const [runTest, setRunTest] = useState(false)
    const [maxValues, setMaxValues] = useState({
        maxValueOUCapture: 0,
        maxValueOUSearch: 0,
        maxValueDataSet: 0,
        maxValueProgram: 0,
        maxValueProgramRule: 0,
        maxValueMetadata: 0,
        maxValueData: 0,
        maxValueReservedValue: 0,
    })
    const [testValues, setTestValues] = useState({
        organisationUnitsNumber: 0,
        organisationUnitSearchNumber: 0,
        datasetNumber: 0,
        programNumber: 0,
        programRuleNumber: 0,
        metadataSize: 0,
        dataSize: 0,
        reservedValueNumber: 0,
    })
    const [testDataLoading, setLoadTestData] = useState({
        orgUnitLoad: false,
        dataSetLoad: false,
        programLoad: false,
        programRuleLoad: false,
        metadataLoad: false,
        dataLoad: false,
        reservedValuesLoad: false,
    })
    const [userSelected, setUserSelected] = useState({
        data: undefined,
        id: undefined,
    })

    const {
        users,
        globalSettings,
        specificSettings,
        reservedValues,
        loading: loadingInitialValues,
    } = prepareInitialData()

    /** MOUNT **/
    const updateRecommendedValue = () => {
        testAndroidDataConstants.forEach(test => {
            setMaxValues({
                [test.maxValueState]: test.maxValue,
            })
        })
    }

    useEffect(() => {
        updateRecommendedValue()
        if (!loadingInitialValues) {
            setLoading(false)
        }
        console.log('mount', {
            users,
            globalSettings,
            specificSettings,
            reservedValues,
            baseUrl,
        })
    }, [users, globalSettings, specificSettings, reservedValues])

    /** MOUNT **/

    const clearFields = () => {
        /*this.userSelected = undefined
        this.userSelectedId = undefined*/

        //not sure what does
        /*this.organisationUnitsNumber = 0
        this.organisationUnitSearchNumber = 0
        this.datasetNumber = 0
        this.programNumber = 0
        this.programRuleNumber = 0*/

        setUserSelected({
            data: undefined,
            id: undefined,
        })
        setTestValues({
            organisationUnitsNumber: 0,
            organisationUnitSearchNumber: 0,
            datasetNumber: 0,
            programNumber: 0,
            programRuleNumber: 0,
            metadataSize: 0,
            dataSize: 0,
            reservedValueNumber: 0,
        })
        setLoadTestData({
            orgUnitLoad: false,
            dataSetLoad: false,
            programLoad: false,
            programRuleLoad: false,
            metadataLoad: false,
            dataLoad: false,
            reservedValuesLoad: false,
        })
        //this.setState({
        /*userSelected: undefined,
            userSelectedId: undefined,*/
        //})
    }

    const checkUsername = userToCheck => {
        clearFields()
        if (userToCheck.length > 3) {
            const foundUser = users.find(user => user.name === userToCheck)

            if (foundUser !== undefined) {
                /*this.userSelected = foundUser
                this.userSelectedId = foundUser.id*/
                setUserSelected({
                    data: foundUser,
                    id: foundUser.id,
                })

                setUsername(userToCheck)
                setRunTestDisable(false)
                /*setState({
                    errorUsername: false,
                    //disabled: false,
                    //username: userToCheck,
                })*/
            } else {
                setRunTestDisable(true)
                /*setState({
                    disabled: true,
                    errorUsername: true,
                })*/
            }
        } else {
            setRunTestDisable(true)
            /*setState({
                disabled: true,
                errorUsername: true,
            })*/
        }
    }

    const handleRun = () => {
        // setLoading(true)
        // getUserData()
        setTestValues({
            organisationUnitsNumber: 10,
            organisationUnitSearchNumber: 50,
            datasetNumber: 2,
            programNumber: 10,
            programRuleNumber: 50,
            metadataSize: 20,
            dataSize: 20,
            reservedValueNumber: 40,
        })
        getUserDataSyncTest(userSelected.data, baseUrl)
        //DiszpKrYNg8
        setRunTest(true)
        //setLoading(false)
    }

    return (
        <SectionWrapper loading={loading}>
            <TestAndroid
                checkUsername={checkUsername}
                clearSearchField={clearFields}
                searchFieldValue={username}
                runTest={runTest}
                //states={this.state}
                maxValues={maxValues}
                loadValues={testDataLoading}
                testValues={testValues}
                handleRun={handleRun}
                disabledTest={runTestDisabled}
                options={users}
                //options={this.usersOptionsComplete}
            />
        </SectionWrapper>
    )
}

export default UserSyncTestContainer
