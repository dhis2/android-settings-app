import mapValues from 'lodash/mapValues'
import omit from 'lodash/omit'

/**
 * Object of objects
 * Remove a list of properties
 * return: object
 */

export const removePropertiesFromObject = (object, propertiesToOmit) =>
    mapValues(object, element => omit(element, propertiesToOmit))
