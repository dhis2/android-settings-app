import every from 'lodash/every'
import orderBy from 'lodash/orderBy'
import { isValidAndroidExpression } from '../../../utils/validators'

/**
 * Show an ordered list of program indicators
 * If all elements are invalid return an empty array
 * */
export const validateAndroidExpressions = (programIndicators) => {
    programIndicators.map((element) => {
        isValidAndroidExpression(element.expression)
            ? (element.valid = true)
            : (element.valid = false)
    })

    if (every(programIndicators, ['valid', false])) {
        return []
    }

    return orderBy(programIndicators, [(item) => item.valid === true], ['desc'])
}

export const getAttributes = (program) =>
    program.programTrackedEntityAttributes.map(
        (tea) => tea.trackedEntityAttribute
    )

/**
 * Replaces substrings matching the "attribute" pattern ("A{...}")
 * with the corresponding values from the given array of trackedEntityAttributes
 * */
export const getExpressionDescription = (expression, attributes) => {
    const regex = /A{([A-Za-z0-9]{11,13})}/g

    // Replace each match with the corresponding value from the array
    return expression?.replace(regex, (match, p1) => {
        const replacementObj = attributes.find((obj) => obj.id === p1)
        return replacementObj ? replacementObj.name : match
    })
}
