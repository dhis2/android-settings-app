import {
    androidSettingsDefault,
    maxValues,
    RESERVED_VALUES,
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
        e.preventDefault()

        let { value } = e.target

        if (e.target.name === RESERVED_VALUES) {
            value = Math.min(maxValues.reservedValues, parseInt(value))
        }

        setFields({ ...fields, [e.target.name]: value })
        setDisableSave(errorNumber.gateway || errorNumber.confirmation)
        setSubmitDataStore({
            success: false,
            error: false,
        })
    }

    const onCheckboxChange = event => {
        setFields({ ...fields, [event.name]: event.checked })
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
     */
    const validatePhoneNumber = e => {
        const { name } = e.target

        if (![null, '', false].includes(fields[name])) {
            const validInput = validateNumber(fields[name])
            if (!validInput) {
                setErrorNumber({ ...errorNumber, [name]: true })
                setDisableSave(true)
            } else {
                setErrorNumber({ ...errorNumber, [name]: false })
            }
        } else {
            setErrorNumber({ ...errorNumber, [name]: false })
        }
    }

    return {
        fields,
        errorNumber,
        openEncryptDialog,
        handleReset,
        setInitialData,
        disableSave,
        setDisableSave,
        handleEncryptDialog,
        getInput: name => ({
            name,
            value: fields[name],
            disabled: fields.disableAll,
            onChange,
        }),
        getPhoneNumber: name => ({
            name,
            value: fields[name],
            onChange,
            onKeyUp: validatePhoneNumber,
            error: errorNumber[name],
            disabled: fields.disableAll,
        }),
        getSelect: name => ({
            name,
            value: fields[name],
            disabled: fields.disableAll,
            onChange,
        }),
        getCheckbox: name => ({
            name,
            checked: fields[name],
            onChange: handleEncryptDialog.onChange,
            disabled: fields.disableAll,
        }),
    }
}
