import { createContext } from 'react'

const AppContext = createContext({
    authorities: [],
    username: '',
    dataStore: [],
})

export { AppContext }
