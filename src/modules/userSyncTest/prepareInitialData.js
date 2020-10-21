import useUsers from '../query/useUsers'
import {
    useGeneralDataStore,
    useProgramDataStore,
} from '../query/useGetDataStore'

const prepareInitialData = () => {
    const { users, loading: loadingUser } = useUsers()
    const { generalSettings, loading: loadingGeneral } = useGeneralDataStore()
    const { programSettings, loading: loadingProgram } = useProgramDataStore()

    console.log({
        users,
        generalSettings,
        programSettings,
    })

    if (!loadingUser && !loadingGeneral && !loadingProgram) {
        console.log('loading user and general', {
            users,
            globalSettings: programSettings.globalSettings,
            specificSettings: programSettings.specificSettings,
            reservedValues: generalSettings.reservedValues,
        })

        return {
            users,
            globalSettings: programSettings.globalSettings,
            specificSettings: programSettings.specificSettings,
            reservedValues: generalSettings.reservedValues,
            loading: false,
        }
    } else {
        return { loading: true }
    }
}

export default prepareInitialData
