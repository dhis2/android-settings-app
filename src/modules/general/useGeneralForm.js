import {
    androidSettingsDefault,
    maxValues,
    RESERVED_VALUES,
    SMS_CONFIRMATION,
    SMS_TO_SEND,
} from '../../constants/android-settings'
import { useState } from 'react'
import { validateNumber } from './validatePhoneNumber'

export const useGeneralForm = ({ setSubmitDataStore }) => {
    const [openEncryptDialog, setOpenEncryptDialog] = useState(false)
    const [disableSave, setDisableSave] = useState(true)
    const [errorNumber, setErrorNumber] = useState({
        numberSmsToSend: false,
        numberSmsConfirmation: false,
    })
    const [fields, setFields] = useState({
        ...androidSettingsDefault,
        numberSmsToSend: '',
        numberSmsConfirmation: '',
    })

    const setInitialData = settings => {
        setFields(settings)
        setDisableSave(true)
    }

    const onChange = e => {
        let { value } = e
        if (e.name === RESERVED_VALUES) {
            value = value <= 0 ? 0 : Math.min(maxValues.reservedValues, value)
        }

        setFields({ ...fields, [e.name]: value })
        setDisableSave(
            errorNumber.numberSmsToSend || errorNumber.numberSmsConfirmation
        )
        setSubmitDataStore({
            success: false,
            error: false,
        })

        if (e.name === SMS_TO_SEND || e.name === SMS_CONFIRMATION) {
            validatePhoneNumber(e)
        }
    }

    const onChangeSelect = (e, name) => {
        setFields({ ...fields, [name]: e.selected })
        setDisableSave(
            errorNumber.numberSmsToSend || errorNumber.numberSmsConfirmation
        )
        setSubmitDataStore({
            success: false,
            error: false,
        })
    }

    /**
     * Sets values to default
     */
    const handleReset = () => {
        setFields({
            ...androidSettingsDefault,
            numberSmsToSend: '',
            numberSmsConfirmation: '',
        })
        setOpenEncryptDialog(false)
        setDisableSave(false)
        setSubmitDataStore({
            success: false,
            error: false,
        })
    }

    /**
     * When using checkbox for Encrypt DB should open dialog
     * onChange: When Checkbox is checked or not opens dialog
     * onClose: close Encrypt DB dialog
     * handleEncrypt: Changes value for encryptDB state
     */

    const handleEncryptDialog = {
        onChange: () => {
            setOpenEncryptDialog(true)
            setSubmitDataStore({
                success: false,
                error: false,
            })
        },
        onClose: () => {
            setOpenEncryptDialog(false)
        },
        handleEncrypt: isChecked => {
            setFields({ ...fields, encryptDB: !isChecked })
            setOpenEncryptDialog(false)
            setDisableSave(false)
        },
    }

    /**
     * Checks if sms number or confirmation number is valid
     * validates number
     */
    const validatePhoneNumber = e => {
        const { name, value } = e
        const errorKeyName = Object.keys(errorNumber).filter(
            errorName => errorName !== e.name
        )[0]
        if (![null, '', false, undefined].includes(value)) {
            const validInput = validateNumber(value)
            if (!validInput) {
                setErrorNumber({ ...errorNumber, [name]: true })
                setDisableSave(true)
            } else {
                setErrorNumber({ ...errorNumber, [name]: false })
                setDisableSave(errorNumber[errorKeyName])
            }
        } else {
            setErrorNumber({ ...errorNumber, [name]: false })
            setDisableSave(errorNumber[errorKeyName])
        }
    }

    return {
        fields,
        setFields,
        errorNumber,
        openEncryptDialog,
        handleReset,
        setInitialData,
        disableSave,
        setDisableSave,
        handleEncryptDialog,
        onChangeSelect,
        getPhoneNumber: name => ({
            name,
            value: fields[name],
            onChange,
            error: errorNumber[name],
            disabled: fields.disableAll,
        }),
        getSelect: name => ({
            name,
            selected: fields[name],
            disabled: fields.disableAll,
        }),
        getCheckbox: name => ({
            name,
            checked: fields[name],
            disabled: fields.disableAll,
            type: 'checkbox',
            onChange: handleEncryptDialog.onChange,
        }),
        getInputNumber: name => ({
            name,
            value: fields[name].toString(),
            type: 'number',
            disabled: fields.disableAll,
            onChange,
        }),
    }
}
