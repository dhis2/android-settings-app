import {
    androidSettingsDefault,
    maxValues,
    RESERVED_VALUES,
} from '../../constants/android-settings'
import { useCallback, useEffect, useState } from 'react'
import { validateNumber } from './validatePhoneNumber'

const {
    metadataSync,
    dataSync,
    encryptDB,
    reservedValues,
} = androidSettingsDefault

export const useGeneralForm = ({
    setOpenDialog,
    setOpenErrorAlert,
    openDialog,
    setSubmitDataStore,
}) => {
    const [generalParameters, setGeneralParameters] = useState({
        metadataSync,
        dataSync,
        numberSmsToSend: '',
        numberSmsConfirmation: '',
        reservedValues,
        encryptDB,
    })

    const [errorNumber, setErrorNumber] = useState({
        confirmation: false,
        gateway: false,
    })

    const [disableSave, setDisableSave] = useState(true)

    useEffect(() => {
        setSubmitDataStore({
            success: false,
            error: false,
        })
    }, [])

    const handleChange = useCallback(e => {
        e.preventDefault()

        let { value } = e.target

        if (e.target.name === RESERVED_VALUES) {
            value = Math.min(maxValues.reservedValues, parseInt(value))
        }

        setGeneralParameters({
            ...generalParameters,
            [e.target.name]: value,
        })
        setDisableSave(errorNumber.gateway || errorNumber.confirmation)
        setSubmitDataStore({
            success: false,
            error: false,
        })
    })

    /**
     * Sets values to default
     */

    const handleReset = useCallback(() => {
        setGeneralParameters({
            metadataSync,
            dataSync,
            numberSmsToSend: '',
            numberSmsConfirmation: '',
            reservedValues,
            encryptDB,
        })
        setOpenDialog({
            ...openDialog,
            encryptDB: false,
        })
        setDisableSave(false)
        setSubmitDataStore({
            success: false,
            error: false,
        })
        setOpenErrorAlert(false)
    })

    /**
     * When using checkbox for Encrypt DB should open dialog
     * onChange: When Checkbox is checked or not opens dialog
     * onClose: close Encrypt DB dialog
     * handleEncrypt: Changes value for encryptDB state
     */

    const handleCheckbox = {
        onChange: useCallback(() => {
            setOpenDialog({
                ...openDialog,
                encryptDB: true,
            })
            setSubmitDataStore({
                success: false,
                error: false,
            })
        }),
        onClose: useCallback(() => {
            setOpenDialog({
                ...openDialog,
                encryptDB: false,
            })
        }),
        handleEncrypt: useCallback(isChecked => {
            setGeneralParameters({
                ...generalParameters,
                encryptDB: !isChecked,
            })
            setOpenDialog({
                ...openDialog,
                encryptDB: false,
            })
            setDisableSave(false)
        }),
    }

    /**
     * Checks if sms number or confirmation number is valid
     */
    const validatePhoneNumber = {
        gatewayNumber: useCallback(() => {
            if (
                ![null, '', false].includes(generalParameters.numberSmsToSend)
            ) {
                const validInput = validateNumber(
                    generalParameters.numberSmsToSend
                )
                if (!validInput) {
                    setErrorNumber({
                        ...errorNumber,
                        gateway: true,
                    })
                    setDisableSave(true)
                } else {
                    setErrorNumber({
                        ...errorNumber,
                        gateway: false,
                    })
                }
            } else {
                setErrorNumber({
                    ...errorNumber,
                    gateway: false,
                })
            }
        }),
        confirmationNumber: useCallback(() => {
            if (
                ![null, '', false].includes(
                    generalParameters.numberSmsConfirmation
                )
            ) {
                const validInput = validateNumber(
                    generalParameters.numberSmsConfirmation
                )
                if (!validInput) {
                    setErrorNumber({
                        ...errorNumber,
                        confirmation: true,
                    })
                    setDisableSave(true)
                } else {
                    setErrorNumber({
                        ...errorNumber,
                        confirmation: false,
                    })
                }
            } else {
                setErrorNumber({
                    ...errorNumber,
                    confirmation: false,
                })
            }
        }),
    }

    return {
        handleChange,
        handleReset,
        handleCheckbox,
        validatePhoneNumber,
        generalParameters,
        setGeneralParameters,
        errorNumber,
        disableSave,
        setDisableSave,
    }
}
