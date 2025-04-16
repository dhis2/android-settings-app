import { userHasAccess } from '../helper'

const user_test1 = {
    id: 'Rq9TNYOyS6a',
    name: 'Arabic Bombali',
    userGroups: [
        {
            id: 'zz6XckBrLlj',
        },
    ],
}

const user_test2 = {
    id: 'Rq9TNYOyS6a',
    name: 'System administrator',
    userGroups: [
        {
            id: 'lFHP5lLkzVr',
        },
    ],
}

test('User group has access to visualization v35', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        userAccesses: [
            {
                access: 'r-------',
                displayName: 'System administrator',
                id: 'Rq9TNYOyS6a',
            },
            {
                access: 'rw------',
                displayName: 'Tom Wakiki',
                id: 'GOLswS44mh8',
            },
        ],
    }

    expect(userHasAccess(visualization, user_test2)).toBeTruthy()
})

test('User group does not have access to visualization v35', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        userAccesses: [
            {
                access: 'r-------',
                displayName: 'John Barnes',
                id: 'DXyJmlo9rge',
            },
            {
                access: 'rw------',
                displayName: 'Tom Wakiki',
                id: 'GOLswS44mh8',
            },
        ],
    }

    expect(userHasAccess(visualization, user_test1)).toBeFalsy()
})

test('User group has access to visualization v36', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        userAccesses: [
            {
                access: 'r-------',
                displayName: 'System administrator',
                id: 'Rq9TNYOyS6a',
            },
            {
                access: 'rw------',
                displayName: 'Tom Wakiki',
                id: 'GOLswS44mh8',
            },
        ],
        sharing: {
            owner: 'GOLswS44mh8',
            public: '--------',
            users: {
                Rq9TNYOyS6a: {
                    access: 'r-------',
                    displayName: 'System administrator',
                    id: 'Rq9TNYOyS6a',
                },
                GOLswS44mh8: {
                    access: 'rw------',
                    displayName: 'Tom Wakiki',
                    id: 'GOLswS44mh8',
                },
            },
        },
    }

    expect(userHasAccess(visualization, user_test2)).toBeTruthy()
})

test('User group does not have access to visualization v36', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        userAccesses: [],
        sharing: {
            owner: 'GOLswS44mh8',
            public: '--------',
            users: {},
        },
    }

    expect(userHasAccess(visualization, user_test1)).toBeFalsy()
})

test('User group has access to visualization v41', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        sharing: {
            owner: 'GOLswS44mh8',
            public: '--------',
            users: {
                Rq9TNYOyS6a: {
                    access: 'r-------',
                    displayName: 'System administrator',
                    id: 'Rq9TNYOyS6a',
                },
                GOLswS44mh8: {
                    access: 'rw------',
                    displayName: 'Tom Wakiki',
                    id: 'GOLswS44mh8',
                },
            },
        },
    }

    expect(userHasAccess(visualization, user_test2)).toBeTruthy()
})

test('User group does not have access to visualization v41', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        sharing: {
            owner: 'GOLswS44mh8',
            public: '--------',
            users: {
                DXyJmlo9rge: {
                    access: 'r-------',
                    displayName: 'John Barnes',
                    id: 'DXyJmlo9rge',
                },
                GOLswS44mh8: {
                    access: 'rw------',
                    displayName: 'Tom Wakiki',
                    id: 'GOLswS44mh8',
                },
            },
        },
    }

    expect(userHasAccess(visualization, user_test1)).toBeFalsy()
})
