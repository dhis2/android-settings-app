/**
 * Use Regular expression to validate phone number
 * */

export const validateNumber = number => {
    const phoneRegex = RegExp('^\\+[1-9][0-9]{3,16}$')
    return phoneRegex.test(number)
}
