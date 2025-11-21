import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import React from 'react'
import { ReservedValues } from '../ReservedValues.jsx'

let mockOnChange

beforeEach(() => {
    cleanup()
    mockOnChange = jest.fn()
})

test('Component is displayed', () => {
    render(
        <ReservedValues
            value={{ reservedValues: 100 }}
            onChange={mockOnChange}
        />
    )

    expect(
        screen.getByLabelText(/Reserved values downloaded per TEI attribute/i)
    ).toBeInTheDocument()
})

test('Allows only values greater than zero', () => {
    render(
        <ReservedValues
            value={{ reservedValues: 100 }}
            onChange={mockOnChange}
        />
    )

    const input = screen.getByLabelText(
        /Reserved values downloaded per TEI attribute/i
    )

    fireEvent.change(input, { target: { value: '-5' } })

    expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
            reservedValues: 0,
        })
    )
})

test('Displays a warning when value is greater than 500', () => {
    render(
        <ReservedValues
            value={{ reservedValues: 100 }}
            onChange={mockOnChange}
        />
    )

    const input = screen.getByLabelText(
        /Reserved values downloaded per TEI attribute/i
    )

    fireEvent.change(input, { target: { value: '600' } })

    expect(
        screen.getByText(/Recommended maximum is 500 reserved values/i)
    ).toBeInTheDocument()
})

test('Valid input updates the value correctly', () => {
    render(
        <ReservedValues
            value={{ reservedValues: 100 }}
            onChange={mockOnChange}
        />
    )

    const input = screen.getByLabelText(
        /Reserved values downloaded per TEI attribute/i
    )

    fireEvent.change(input, { target: { value: '200' } })

    expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
            reservedValues: 200,
        })
    )
})
