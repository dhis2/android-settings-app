import every from 'lodash/every'
import orderBy from 'lodash/orderBy'
import { isValidAndroidExpression } from '../../../utils/validators'

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
