import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SmsGateway } from '../SmsGateway.js'

let mockOnChange

beforeEach(() => {
    cleanup()
    mockOnChange = jest.fn()
})

test('renders SMS Gateway component', () => {
    render(<SmsGateway value={{ smsGateway: '' }} onChange={mockOnChange} />)
    expect(
        screen.getByLabelText(/SMS Gateway phone number/i)
    ).toBeInTheDocument()
})

test('valid phone number input triggers onChange', () => {
    render(<SmsGateway value={{ smsGateway: '' }} onChange={mockOnChange} />)

    const input = screen.getByLabelText(/SMS Gateway phone number/i)
    fireEvent.change(input, { target: { value: '+1234567890' } })

    expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
            smsGateway: '+1234567890',
        })
    )
})

test('invalid phone number shows error message', () => {
    render(<SmsGateway value={{ smsGateway: '' }} onChange={mockOnChange} />)

    const input = screen.getByLabelText(/SMS Gateway phone number/i)
    fireEvent.change(input, { target: { value: '12345' } })

    expect(
        screen.getByText(
            /must start with \+ and be at least 4 characters long/i
        )
    ).toBeInTheDocument()
})

test('clearing the input triggers onChange with empty value', () => {
    render(
        <SmsGateway
            value={{ smsGateway: '+1234567890' }}
            onChange={mockOnChange}
        />
    )

    const input = screen.getByLabelText(/SMS Gateway phone number/i)
    fireEvent.change(input, { target: { value: '' } })

    expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
            smsGateway: '',
        })
    )
})
