import filter from 'lodash/filter'
import isNil from 'lodash/isNil'
import keysIn from 'lodash/keysIn'
import {
    defaultEncryptDB,
    defaultReservedValues,
    defaultShareScreen,
} from '../../components/field'
import {
    isValidURL,
    isValidValue,
    validateNumber,
} from '../../utils/validators'

/**
 * Return a settings object with properties that have a valid value
 * */
export const checkValidSettings = (settings) => {
    const settingsToSave = Object.assign({}, settings)

    !isValidValue(settingsToSave.smsGateway) && delete settingsToSave.smsGateway
    !isValidValue(settingsToSave.smsResultSender) &&
        delete settingsToSave.smsResultSender
    !isValidValue(settingsToSave.matomoURL) && delete settingsToSave.matomoURL
    !isValidValue(settingsToSave.matomoID) && delete settingsToSave.matomoID

    return settingsToSave
}

/**
 * Checks if:
 *  Gateway and result sender phone number
 *  Matomo's URL
 *  are not valid inputs
 * */
export const notValidFields = (data) =>
    (isValidValue(data.smsGateway) && !validateNumber(data.smsGateway)) ||
    (isValidValue(data.smsResultSender) &&
        !validateNumber(data.smsResultSender)) ||
    (isValidValue(data.matomoURL) && !isValidURL(data.matomoURL))

export const createInitialValues = (prevGeneralDetails) => ({
    matomoURL: prevGeneralDetails.matomoURL || '',
    matomoID: prevGeneralDetails.matomoID || '',
    smsGateway: prevGeneralDetails.smsGateway || '',
    smsResultSender: prevGeneralDetails.smsResultSender || '',
    reservedValues: validReservedValue(prevGeneralDetails.reservedValues),
    encryptDB: prevGeneralDetails.encryptDB || defaultEncryptDB,
    allowScreenCapture:
        prevGeneralDetails.allowScreenCapture || defaultShareScreen,
    experimentalFeatures: prevGeneralDetails.experimentalFeatures || [],
})

const validReservedValue = (value) => {
    if (isNil(value) || !isValidValue(value)) {
        return defaultReservedValues
    }
    return value
}

export const getFeaturesList = (list) => {
    //pickBy(list, true)
    const b = filter(list, (value, key) => {
        console.log({ key, value })
        return value === true ? key : false
    })
    const c = keysIn(b)
    const d = filter(list, true)

    console.log({ filterList: b, keysList: c, secondFilter: d, list })
    return c
}
