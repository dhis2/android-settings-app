/**
 * An expression is valid for android when:
 * - Based only on attributes and functions
 * - attributes: "A{attribute}"
 * - functions: "d2:concatenate"
 * - No Data Elements: "#{programStage.dataElement}"
 * - No variables: "V{variable}"
 * */

export const isValidAndroidExpression = (inputString) => {
    const invalidPatterns = [
        /#\{[^}]*/, // Matches anything starting with "#{"
        /V\{\s*[^}]+\s*/, // Matches "V{}" with optional spaces inside the braces
        /#\{[^}]*|V\{\s*[^}]+\s*/, // Combination of the above two
    ]

    // Check if the string contains any invalid patterns
    return !invalidPatterns.some((pattern) => pattern.test(inputString))
}
