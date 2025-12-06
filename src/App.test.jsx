import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

/* eslint-disable-next-line react/display-name */
jest.mock('./pages/AppLayout.jsx', () => () => {
    return <mock-applayout />
})

it('renders without crashing', () => {
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(<App />)
    root.unmount()
})
