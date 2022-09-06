import { isValidValue } from './isValidValue'

/**
 * A valid array it is consider if every value is valid.
 *
 * A valid value it is consider if:
 * value == true
 * length > 0
 * */

export const validateObjectByProperty = (propertyArray, object) =>
    propertyArray.every((property) => isValidValue(object[property]) === true)
