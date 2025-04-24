import { visualizationHasPublicAccess } from '../helper'

test('Visualization has public access v35', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        publicAccess: 'rw------',
    }

    expect(visualizationHasPublicAccess(visualization)).toBeTruthy()
})

test('Visualization does not have public access v35', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        publicAccess: '--------',
    }

    expect(visualizationHasPublicAccess(visualization)).toBeFalsy()
})

test('Visualization has public access v36', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        publicAccess: 'rw-------',
        sharing: {
            owner: 'GOLswS44mh8',
            public: 'rw------',
        },
    }
    expect(visualizationHasPublicAccess(visualization)).toBeTruthy()
})

test('Visualization does not have public access v36', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        publicAccess: '--------',
        sharing: {
            owner: 'GOLswS44mh8',
            public: '--------',
        },
    }
    expect(visualizationHasPublicAccess(visualization)).toBeFalsy()
})

test('Visualization has public access v41', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        sharing: {
            owner: 'GOLswS44mh8',
            public: 'r-------',
        },
    }
    expect(visualizationHasPublicAccess(visualization)).toBeTruthy()
})

test('Visualization does not have public access v41', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        sharing: {
            owner: 'GOLswS44mh8',
            public: '--------',
        },
    }
    expect(visualizationHasPublicAccess(visualization)).toBeFalsy()
})
