import isNil from 'lodash/isNil'
import map from 'lodash/map'
import {
    defaultBypassDHIS2Version,
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
    bypassDHIS2VersionCheck:
        prevGeneralDetails.bypassDHIS2VersionCheck || defaultBypassDHIS2Version,
    experimentalFeatures: prevGeneralDetails.experimentalFeatures || [],
})

const validReservedValue = (value) => {
    if (isNil(value) || !isValidValue(value)) {
        return defaultReservedValues
    }
    return value
}

/**
 * Create an array with the keys of valid or selected elements
 * */
export const getValidKeysList = (list) =>
    map(list, (value, key) => value === true && key).filter((e) =>
        isValidValue(e)
    )
