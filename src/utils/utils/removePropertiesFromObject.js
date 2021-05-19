import omit from 'lodash/omit'
import mapValues from 'lodash/mapValues'

/**
 * Object of objects
 * Remove a list of properties
 * return: object
 */

export const removePropertiesFromObject = (object, propertiesToOmit) =>
    mapValues(object, element => omit(element, propertiesToOmit))
