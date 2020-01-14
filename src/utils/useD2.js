import { useState, useEffect } from 'react'
import { init as initD2, getInstance as getD2Instance } from 'd2'
import { useConfig } from '@dhis2/app-runtime'

let initialized = false
let theD2 = null

export const useD2 = () => {
    const { baseUrl, apiVersion } = useConfig()
    const [d2, setD2] = useState(theD2)

    useEffect(() => {
        if (!initialized) {
            initialized = true
            initD2({ baseUrl: `${baseUrl}/api/${apiVersion}` }).then(d2 => {
                theD2 = d2
                setD2(d2)
            })
        } else if (!theD2) {
            getD2Instance().then(setD2)
        }
    }, [])

    return d2 // null while loading
}
