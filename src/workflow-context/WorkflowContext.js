import { createContext } from 'react'

const WorkflowContext = createContext({
    programs: [],
    dataSets: [],
})

export { WorkflowContext }
