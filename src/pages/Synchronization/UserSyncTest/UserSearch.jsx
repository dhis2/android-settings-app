import isEmpty from 'lodash/isEmpty'
import React, { useMemo, useState } from 'react'
import RunTest from './RunTest.jsx'
import ItemSelector from './searchField/ItemSelector.jsx'

const UserSearch = () => {
    const [userSelected, setUser] = useState()
    const disableRun = useMemo(() => isEmpty(userSelected), [userSelected])

    return (
        <>
            <ItemSelector selection={setUser} />
            <RunTest disabled={disableRun} user={userSelected} />
        </>
    )
}

export default UserSearch
