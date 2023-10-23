import { isValidAndroidExpression } from '../isValidAndroidExpression'

test('"A{ZzYYXq4fJie}" is a valid Android expression', () => {
    const expression = 'A{ZzYYXq4fJie}'
    expect(isValidAndroidExpression(expression)).toBeTruthy()
})

test('"A{ZzYYXq4fJie} + A{ZzYYXq4fJie}" is a valid Android expression', () => {
    const expression = 'A{ZzYYXq4fJie} + A{ZzYYXq4fJie}'
    expect(isValidAndroidExpression(expression)).toBeTruthy()
})

test('"(A{A03MvHHogjR}+A{GQY2lXrypjO})/A{value_count}" is a valid Android expression', () => {
    const expression = '(A{A03MvHHogjR}+A{GQY2lXrypjO})/A{value_count}'
    expect(isValidAndroidExpression(expression)).toBeTruthy()
})

test("\"A{w75KJ2mc4zz}  A{zDhUuAYrxNC}, if(A{cejWyOfXge6} == 'Male', 'M', 'F')\" is a valid Android expression", () => {
    const expression =
        "A{w75KJ2mc4zz}  A{zDhUuAYrxNC}, if(A{cejWyOfXge6} == 'Male', 'M', 'F')"
    expect(isValidAndroidExpression(expression)).toBeTruthy()
})

test("\"d2:concatenate(A{w75KJ2mc4zz}, ' ', A{zDhUuAYrxNC}, ', ', d2:substring(A{cejWyOfXge6}, 0, 1)\" is a valid Android expression", () => {
    const expression =
        "d2:concatenate(A{w75KJ2mc4zz}, ' ', A{zDhUuAYrxNC}, ', ', d2:substring(A{cejWyOfXge6}, 0, 1))"
    expect(isValidAndroidExpression(expression)).toBeTruthy()
})

test('"#{ZzYYXq4fJie.rxBfISxXS2U}" is not a valid Android expression', () => {
    const expression = '#{ZzYYXq4fJie.rxBfISxXS2U}'
    expect(isValidAndroidExpression(expression)).toBeFalsy()
})

test('"#{ZzYYXq4fJie.FqlgKAG8HOu} + #{ZzYYXq4fJie.rxBfISxXS2U}" is not a valid Android expression', () => {
    const expression = '#{ZzYYXq4fJie.FqlgKAG8HOu} + #{ZzYYXq4fJie.rxBfISxXS2U}'
    expect(isValidAndroidExpression(expression)).toBeFalsy()
})

test('"(#{A03MvHHogjR.UXz7xuGCEhU}+#{ZzYYXq4fJie.GQY2lXrypjO})/A{value_count}" is not a valid Android expression', () => {
    const expression =
        '(#{A03MvHHogjR.UXz7xuGCEhU}+#{ZzYYXq4fJie.GQY2lXrypjO})/A{value_count}'
    expect(isValidAndroidExpression(expression)).toBeFalsy()
})

test('"(A{A03MvHHogjR}+#{ZzYYXq4fJie.GQY2lXrypjO})/A{value_count}" is not a valid Android expression', () => {
    const expression =
        '(A{A03MvHHogjR}+#{ZzYYXq4fJie.GQY2lXrypjO})/A{value_count}'
    expect(isValidAndroidExpression(expression)).toBeFalsy()
})

test('"(A{ZzYYXq4fJie}+#{ZzYYXq4fJie.GQY2lXrypjO})" is not a valid Android expression', () => {
    const expression = '(A{ZzYYXq4fJie}+#{ZzYYXq4fJie.GQY2lXrypjO})'
    expect(isValidAndroidExpression(expression)).toBeFalsy()
})

test('"V{event_count}" is not a valid Android expression', () => {
    const expression = 'V{event_count}'
    expect(isValidAndroidExpression(expression)).toBeFalsy()
})

test('"#{ZzYYXq4fJie.GQY2lXrypjO}" is not a valid Android expression', () => {
    const expression = '#{ZzYYXq4fJie.GQY2lXrypjO}'
    expect(isValidAndroidExpression(expression)).toBeFalsy()
})
