import React from 'react'
import { useD2 } from './useD2'

export const D2Shim = ({ children }) => {
    const d2 = useD2()

    if (!d2) {
        return null
    }

    return children.map(child => React.cloneElement(child, { d2: d2 }))
}
