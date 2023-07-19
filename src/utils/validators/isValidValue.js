/**
 * A valid value it is consider if it is:
 * value == true
 * length > 0
 * */

export const isValidValue = (value) =>
    ![null, '', false, undefined].includes(value)
