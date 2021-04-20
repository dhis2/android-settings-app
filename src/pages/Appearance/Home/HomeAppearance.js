import React, { useEffect, useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { useReadAppearanceDataStore } from '../appearanceDatastoreQuery'
import HomeSettings from './HomeSettings'
import { createInitialValues } from './helper'

const authorityQuery = {
    authority: {
        resource: 'me/authorities/ALL',
    },
}

const HomeAppearance = () => {
    const { load, home } = useReadAppearanceDataStore()
    const { data } = useDataQuery(authorityQuery)
    const [settings, setSettings] = useState()
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        data && setDisable(!data.authority)
    }, [data])

    useEffect(() => {
        if (home) {
            setSettings(createInitialValues(home))
        }
    }, [home])

    return (
        <>
            {settings && !load && (
                <>
                    <HomeSettings
                        states={settings}
                        onChange={setSettings}
                        disable={disable}
                    />
                </>
            )}
        </>
    )
}

export default HomeAppearance
