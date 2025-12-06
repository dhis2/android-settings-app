import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import DisableSettings from '../DisableSettings.jsx'

const mockMutate = jest.fn()

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(() => [mockMutate]),
}))

jest.mock('../../../utils/useNavigation', () => ({
    useNavigation: () => ({
        reloadPage: jest.fn(),
        navigateTo: jest.fn(),
    }),
}))

describe('DisableSettings', () => {
    beforeEach(() => {
        mockMutate.mockReset()
    })

    it('displays the button', () => {
        render(<DisableSettings disabled={false} />)
        const disableButton = screen.getByRole('button', {
            name: /disable all settings/i,
        })
        expect(disableButton).toBeInTheDocument()
    })

    it('opens the modal when the button is clicked', async () => {
        render(<DisableSettings disabled={false} />)

        const disableButton = screen.getByRole('button', {
            name: /disable all settings/i,
        })
        await userEvent.click(disableButton)

        const modal = await screen.findByText(
            /are you sure you want to disable all settings\?/i
        )
        expect(modal).toBeInTheDocument()
    })

    it('deletes the namespace when "Disable" is clicked', async () => {
        render(<DisableSettings disabled={false} />)

        const disableButton = screen.getByRole('button', {
            name: /disable all settings/i,
        })
        await userEvent.click(disableButton)

        const disableModalButton = await screen.findByRole('button', {
            name: /^disable$/i,
        })
        await userEvent.click(disableModalButton)

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledTimes(1)
        })
    })

    it('does not make changes when "Cancel" is clicked', async () => {
        render(<DisableSettings disabled={false} />)
        const disableButton = screen.getByRole('button', {
            name: /disable all settings/i,
        })
        await userEvent.click(disableButton)

        const cancelButton = await screen.findByRole('button', {
            name: /cancel/i,
        })
        await userEvent.click(cancelButton)

        await waitFor(() => {
            const modal = screen.queryByText(
                /Are you sure you want to disable all settings\?/i
            )
            expect(modal).not.toBeInTheDocument()
        })
    })

    it('disables the button when disabled prop is true', () => {
        render(<DisableSettings disabled={true} />)
        const disableButton = screen.getByRole('button', {
            name: /disable all settings/i,
        })
        expect(disableButton).toBeDisabled()
    })
})
