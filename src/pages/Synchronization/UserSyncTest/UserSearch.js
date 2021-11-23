import React, { useEffect, useState } from 'react'
import ItemSelector from './searchField/ItemSelector'
import RunTest from './RunTest'

const UserSearch = () => {
    const [disableRun, setDisableRun] = useState(true)
    const [userSelected, setUser] = useState()

    useEffect(() => {
        userSelected ? setDisableRun(false) : setDisableRun(true)
    }, [userSelected])

    return (
        <>
            <ItemSelector selection={setUser} />
            <RunTest disabled={disableRun} user={userSelected} />
        </>
    )
}

export default UserSearch
