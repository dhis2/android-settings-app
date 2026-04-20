import '@testing-library/jest-dom'
import { render, screen, within, configure } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'
import { MetadataSync } from '../MetadataSync.jsx'

let mockOnChange

const mockStartValue = {
    metadataSync: '24h',
    dataSync: '24h',
    trackerImporterVersion: 'V2',
    trackerExporterVersion: 'V2',
    fileMaxLengthBytes: null,
}

const expectSelectToExistWithOptions = async (
    triggeringDiv,
    { selected = undefined, options = [] },
    screen
) => {
    const selectInput = within(triggeringDiv).getByTestId(
        'dhis2-uicore-select-input'
    )
    expect(selectInput).toBeVisible()
    if (selected) {
        expect(selectInput).toHaveTextContent(selected)
    }
    await userEvent.click(selectInput)

    const optionsWrapper = await screen.findByTestId(
        'dhis2-uicore-select-menu-menuwrapper'
    )
    expect(optionsWrapper).toBeVisible()
    const foundOptions = within(optionsWrapper).getAllByTestId(
        'dhis2-uicore-singleselectoption'
    )
    expect(foundOptions).toHaveLength(options.length)
    options.forEach((option, index) => {
        expect(foundOptions[index]).toHaveTextContent(option.displayName)
    })
    await userEvent.click(selectInput)
}

beforeEach(() => {
    jest.clearAllMocks()
    mockOnChange = jest.fn()
    configure({ testIdAttribute: 'data-test' })
})

describe('MetadataSynce', () => {
    test('renders Metadata sync component with appropriate options', async () => {
        const expectedOptions = [
            { displayName: '6 Hours' },
            { displayName: '12 Hours' },
            { displayName: '1 Day' },
            { displayName: '1 Week' },
            { displayName: 'Manual' },
        ]
        render(
            <div data-test="testing-wrapper">
                <MetadataSync onChange={mockOnChange} value={mockStartValue} />
            </div>
        )
        expect(
            screen.getByText(/How often should metadata sync?/i)
        ).toBeInTheDocument()
        await expectSelectToExistWithOptions(
            screen.getByTestId('testing-wrapper'),
            { options: expectedOptions, selected: '1 Day' },
            screen
        )
    })
})
