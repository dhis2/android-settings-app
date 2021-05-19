import { removePropertiesFromObject } from './removePropertiesFromObject'

/**
 * Object of objects
 * Remove name and id from every key
 * return: object
 */

export const removeNameIDFromSettings = settingsObject =>
    removePropertiesFromObject(settingsObject, ['name', 'id'])
