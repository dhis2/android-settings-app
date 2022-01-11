import {
    isValidURL,
    isValidValue,
    validateNumber,
} from '../../utils/validators'
import {
    defaultEncryptDB,
    defaultReservedValues,
    defaultShareScreen,
} from '../../components/field'

/**
 * Return a settings object with properties that have a valid value
 * */
export const checkValidSettings = settings => {
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
export const notValidFields = data =>
    (isValidValue(data.smsGateway) && !validateNumber(data.smsGateway)) ||
    (isValidValue(data.smsResultSender) &&
        !validateNumber(data.smsResultSender)) ||
    (isValidValue(data.matomoURL) && !isValidURL(data.matomoURL))

export const createInitialValues = prevGeneralDetails => ({
    matomoURL: prevGeneralDetails.matomoURL || '',
    matomoID: prevGeneralDetails.matomoID || '',
    smsGateway: prevGeneralDetails.smsGateway || '',
    smsResultSender: prevGeneralDetails.smsResultSender || '',
    reservedValues: prevGeneralDetails.reservedValues || defaultReservedValues,
    encryptDB: prevGeneralDetails.encryptDB || defaultEncryptDB,
    allowScreenCapture:
        prevGeneralDetails.allowScreenCapture || defaultShareScreen,
})
