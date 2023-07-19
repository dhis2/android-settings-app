import { joinObjectsById } from '../helper'

test('The list has the correct ids', () => {
    const listToTest = [
        [{ id: 'Yf6UHoPkdS6' }, { id: 'ycd5BzF8jYw' }, { id: 'fqs276KXCXi' }],
        [{ id: 'TiOkbpGEud4' }, { id: 'fqs276KXCXi' }],
        [{ id: 'ham2eIDJ9k6' }, { id: 'ycd5BzF8jYw' }],
        [{ id: 'Yf6UHoPkdS6' }],
    ]
    const desiredResult = [
        'Yf6UHoPkdS6',
        'ycd5BzF8jYw',
        'fqs276KXCXi',
        'TiOkbpGEud4',
        'ham2eIDJ9k6',
    ]
    expect(joinObjectsById(listToTest)).toMatchObject(desiredResult)
})

test('The result list shows duplicated ids', () => {
    const listToTest = [
        [{ id: 'Yf6UHoPkdS6' }, { id: 'ycd5BzF8jYw' }, { id: 'fqs276KXCXi' }],
        [{ id: 'TiOkbpGEud4' }, { id: 'fqs276KXCXi' }],
        [{ id: 'ham2eIDJ9k6' }, { id: 'ycd5BzF8jYw' }],
        [{ id: 'Yf6UHoPkdS6' }],
    ]
    const desiredResult = [
        'Yf6UHoPkdS6',
        'ycd5BzF8jYw',
        'fqs276KXCXi',
        'TiOkbpGEud4',
        'ham2eIDJ9k6',
        'Yf6UHoPkdS6',
    ]
    expect(joinObjectsById(listToTest)).not.toMatchObject(desiredResult)
})
