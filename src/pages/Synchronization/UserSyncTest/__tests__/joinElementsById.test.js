import {joinElementsById} from "../helper";

test('The list has the correct ids', () => {
    const listToTest = [{id: "bWuNrMHEoZ0"}, {id: "bWuNrMHEoZ0"}, {id: "bWuNrMHEoZ0"}, {id: "JkWynlWMjJR"}, {id: "ulgL07PF8rq"}]
    const desiredResult = ["bWuNrMHEoZ0", "JkWynlWMjJR", "ulgL07PF8rq"]

    expect(joinElementsById(listToTest)).toMatchObject(desiredResult)
    expect(joinElementsById(listToTest)).toHaveLength(3)
})

it('matches if the actual array does contain the expected elements', () => {
    const listToTest = [{id: "bWuNrMHEoZ0"}, {id: "bWuNrMHEoZ0"}, {id: "bWuNrMHEoZ0"}, {id: "JkWynlWMjJR"}, {id: "ulgL07PF8rq"}]
    const desiredResult = ["bWuNrMHEoZ0", "JkWynlWMjJR", "ulgL07PF8rq"]

    expect(joinElementsById(listToTest)).toEqual(
        expect.arrayContaining(desiredResult),
    )
})

it('matches if the actual array does not contain the expected elements', () => {
    const listToTest = [{id: "bWuNrMHEoZ0"}, {id: "bWuNrMHEoZ0"}, {id: "bWuNrMHEoZ0"}, {id: "JkWynlWMjJR"}, {id: "ulgL07PF8rq"}]
    const desiredResult = ["bWuNrMHEoZ0", "JkWynlWMjJR", "ulgL07PF8rq", "JkWynlWMjJR"]

    expect(joinElementsById(listToTest)).not.toMatchObject(desiredResult)
})
