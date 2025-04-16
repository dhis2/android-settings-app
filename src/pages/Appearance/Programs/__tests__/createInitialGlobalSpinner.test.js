import { createInitialGlobalSpinner } from '../helper'

test('Generate default values', () => {
    const result = {
        completionSpinner: false,
        disableReferrals: false,
        disableCollapsibleSections: false,
    }

    expect(createInitialGlobalSpinner({})).toMatchObject(result)
})

test('Create global spinner values', () => {
    const initialValues = {
        completionSpinner: true,
        disableReferrals: false,
        disableCollapsibleSections: true,
    }

    const result = {
        completionSpinner: true,
        disableReferrals: false,
        disableCollapsibleSections: true,
    }

    expect(createInitialGlobalSpinner(initialValues)).toMatchObject(result)
})

test('Create global spinner values and add default values', () => {
    const initialValues = {
        disableReferrals: false,
        disableCollapsibleSections: true,
    }

    const result = {
        completionSpinner: false,
        disableReferrals: false,
        disableCollapsibleSections: true,
    }

    expect(createInitialGlobalSpinner(initialValues)).toMatchObject(result)
})

test('Create global spinner values and add default values', () => {
    const initialValues = {
        completionSpinner: null,
        disableReferrals: false,
        disableCollapsibleSections: true,
    }

    const result = {
        completionSpinner: false,
        disableReferrals: false,
        disableCollapsibleSections: true,
    }

    expect(createInitialGlobalSpinner(initialValues)).toMatchObject(result)
})
