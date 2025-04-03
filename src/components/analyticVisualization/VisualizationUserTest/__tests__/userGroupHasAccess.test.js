import { userGroupHasAccess } from '../helper'

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
        userGroupAccesses: [
            {
                access: 'r-------',
                displayName: 'System administrators',
                id: 'lFHP5lLkzVr',
            },
            {
                access: 'r-------',
                displayName: '_DATASET_System administrator (ALL)',
                id: 'zz6XckBrLlj',
            },
        ],
    }

    expect(userGroupHasAccess(visualization, user_test2)).toBeTruthy()
})

test('User group does not have access to visualization v35', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        userGroupAccesses: [
            {
                access: 'r-------',
                displayName: '_DATASET_System administrator (ALL)',
                id: 'zz6XckBrLlj',
            },
        ],
    }

    expect(userGroupHasAccess(visualization, user_test2)).toBeFalsy()
})

test('User group has access to visualization v36', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        userGroupAccesses: [
            {
                access: 'r-------',
                displayName: 'System administrators',
                id: 'lFHP5lLkzVr',
            },
            {
                access: 'r-------',
                displayName: '_DATASET_System administrator (ALL)',
                id: 'zz6XckBrLlj',
            },
        ],
        sharing: {
            owner: 'GOLswS44mh8',
            public: '--------',
            userGroups: {
                lFHP5lLkzVr: {
                    access: 'r-------',
                    displayName: 'System administrators',
                    id: 'lFHP5lLkzVr',
                },
                zz6XckBrLlj: {
                    access: 'r-------',
                    displayName: '_DATASET_System administrator (ALL)',
                    id: 'zz6XckBrLlj',
                },
            },
        },
    }

    expect(userGroupHasAccess(visualization, user_test1)).toBeTruthy()
})

test('User group does not have access to visualization v36', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        userGroupAccesses: [],
        sharing: {
            owner: 'GOLswS44mh8',
            public: '--------',
            userGroups: {},
        },
    }

    expect(userGroupHasAccess(visualization, user_test2)).toBeFalsy()
})

test('User group has access to visualization v41', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        sharing: {
            owner: 'GOLswS44mh8',
            public: '--------',
            userGroups: {
                lFHP5lLkzVr: {
                    access: 'r-------',
                    displayName: 'System administrators',
                    id: 'lFHP5lLkzVr',
                },
                zz6XckBrLlj: {
                    access: 'r-------',
                    displayName: '_DATASET_System administrator (ALL)',
                    id: 'zz6XckBrLlj',
                },
            },
        },
    }

    expect(userGroupHasAccess(visualization, user_test1)).toBeTruthy()
})

test('User group does not have access to visualization v41', () => {
    const visualization = {
        id: 'Y7YID6UbXkE',
        name: 'Android ANC: 1st and 3rd trends Monthly (copy)',
        sharing: {
            owner: 'GOLswS44mh8',
            public: '--------',
            userGroups: {
                zz6XckBrLlj: {
                    access: 'r-------',
                    displayName: '_DATASET_System administrator (ALL)',
                    id: 'zz6XckBrLlj',
                },
            },
        },
    }

    expect(userGroupHasAccess(visualization, user_test2)).toBeFalsy()
})
