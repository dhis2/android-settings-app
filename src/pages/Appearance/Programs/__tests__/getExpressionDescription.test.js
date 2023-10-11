import {getExpressionDescription} from "../expressionHelper";

const attributes = [
    {
        id: "w75KJ2mc4zz",
        name: "First name",
        valueType: "TEXT"
    },
    {
        id: "zDhUuAYrxNC",
        name: "Last name",
        valueType: "TEXT"
    },
    {
        id: "cejWyOfXge6",
        name: "Gender",
        valueType: "TEXT"
    },
    {
        id: "lZGmxYbs97q",
        name: "Unique ID",
        valueType: "TEXT"
    },
    {
        id: "iESIqZ0R0R0",
        name: "Date of birth",
        valueType: "DATE"
    }
]

test('From a list of attributes you can get this expression', () => {
    const expression = "A{w75KJ2mc4zz}  A{zDhUuAYrxNC}, if(A{cejWyOfXge6} == 'Male', 'M', 'F')"
    const resultExpression = "First name  Last name, if(Gender == 'Male', 'M', 'F')"
    expect(getExpressionDescription(expression, attributes)).toMatch(resultExpression)
})

test('From a list of attributes you can get this expression', () => {
    const expression = "A{w75KJ2mc4zz} + A{zDhUuAYrxNC}"
    const resultExpression = "First name + Last name"
    expect(getExpressionDescription(expression, attributes)).toMatch(resultExpression)
})

test('From a list of attributes you can get this expression', () => {
    const expression = "A{w75KJ2mc4zz} + A{cejWyOfXge6}"
    const resultExpression = "First name + Gender"
    expect(getExpressionDescription(expression, attributes)).toMatch(resultExpression)
})

test('From a list of attributes you can get this expression', () => {
    const expression = "d2:concatenate(A{w75KJ2mc4zz}, ' ', A{zDhUuAYrxNC})"
    const resultExpression = "d2:concatenate(First name, ' ', Last name)"
    expect(getExpressionDescription(expression, attributes)).toMatch(resultExpression)
})

test('From a list of attributes you can get this expression', () => {
    const expression = "d2:concatenate(A{w75KJ2mc4zz}, ' ', A{zDhUuAYrxNC}, ', ', A{iESIqZ0R0R0})"
    const resultExpression = "d2:concatenate(First name, ' ', Last name, ', ', Date of birth)"
    expect(getExpressionDescription(expression, attributes)).toMatch(resultExpression)
})
