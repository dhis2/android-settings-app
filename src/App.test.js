import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

/* eslint-disable-next-line react/display-name */
jest.mock('./pages/AppLayout', () => () => {
    return <mock-applayout />
})

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
})
