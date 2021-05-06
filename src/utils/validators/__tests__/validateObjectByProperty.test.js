import { validateObjectByProperty } from '../validateObjectByProperty'

test('all object values from an array with specific properties are valid', () => {
    const property = ['number', 'string', 'bool']
    const object = {
        number: 1,
        string: 'hello',
        bool: true,
        array: [],
    }
    expect(validateObjectByProperty(property, object)).toBeTruthy()
})

test('all object values from an array with specific properties are not valid', () => {
    const property = ['number', 'string', 'bool']
    const object = {
        number: undefined,
        string: 'hello',
        bool: true,
        array: [],
    }
    expect(validateObjectByProperty(property, object)).toBeFalsy()
})

test('all object values from an array with specific properties are not valid', () => {
    const property = ['number', 'string', 'bool']
    const object = {
        number: 1,
        string: 'hello',
        bool: false,
        array: [],
    }
    expect(validateObjectByProperty(property, object)).toBeFalsy()
})

test('all object values from an array with specific properties are not valid', () => {
    const property = ['number', 'string', 'bool']
    const object = {
        number: 1,
        string: null,
        bool: false,
        array: [],
    }
    expect(validateObjectByProperty(property, object)).toBeFalsy()
})
