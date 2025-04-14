import { render, screen, configure } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import { SyncSelect, MANUAL } from '../SyncSelect'
configure({ testIdAttribute: 'data-test' })

const mockOptions = [
    { label: 'Automatic', value: 'automatic' },
    { label: 'Manual', value: 'manual' },
]

const defaultProps = {
    name: 'metadata',
    selected: 'automatic',
    options: mockOptions,
    onChange: jest.fn(),
    settings: { metadata: 'automatic' },
}

const openAndSelectManual = async () => {
    const svgToggle = screen
        .getByTestId('dhis2-uicore-select-input')
        .querySelector('svg')
    await userEvent.click(svgToggle)

    const manualOption = await screen.findByText('Manual')
    await userEvent.click(manualOption)
}

describe('SyncSelect', () => {
    it('renders the select field with provided options', async () => {
        render(<SyncSelect {...defaultProps} />)
        const svgToggle = screen
            .getByTestId('dhis2-uicore-select-input')
            .querySelector('svg')
        expect(svgToggle).toBeInTheDocument()
        expect(await screen.findByText('Automatic')).toBeInTheDocument()
        await userEvent.click(svgToggle)
        expect(await screen.findByText('Manual')).toBeInTheDocument()
    })

    it('opens modal when "Manual" is selected', async () => {
        render(<SyncSelect {...defaultProps} />)
        const svgToggle = screen
            .getByTestId('dhis2-uicore-select-input')
            .querySelector('svg')
        await userEvent.click(svgToggle)
        const manualOption = await screen.findByText('Manual')
        await userEvent.click(manualOption)
        expect(
            await screen.findByTestId('dhis2-uicore-modal')
        ).toBeInTheDocument()
    })

    it('selects "Manual" when "Yes" is clicked in the modal', async () => {
        const onChange = jest.fn()
        render(<SyncSelect {...defaultProps} onChange={onChange} />)
        await openAndSelectManual()
        const yesButton = await screen.findByRole('button', { name: /yes/i })
        await userEvent.click(yesButton)
        expect(onChange).toHaveBeenCalledWith({ metadata: MANUAL })
    })

    it('reverts to previous value when "Cancel" is clicked in the modal', async () => {
        const onChange = jest.fn()
        render(<SyncSelect {...defaultProps} onChange={onChange} />)
        await openAndSelectManual()
        const cancelButton = await screen.findByRole('button', {
            name: /cancel/i,
        })
        await userEvent.click(cancelButton)
        expect(onChange).toHaveBeenCalledWith({ metadata: 'automatic' })
    })
})
