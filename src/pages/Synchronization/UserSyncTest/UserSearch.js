import React, { useMemo, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import ItemSelector from './searchField/ItemSelector'
import RunTest from './RunTest'

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
