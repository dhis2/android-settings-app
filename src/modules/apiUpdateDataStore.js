import api from '../utils/api'
import { NAMESPACE } from '../constants/data-store'

export const apiUpdateDataStore = async (data, keyName) => {
    return await api.updateValue(NAMESPACE, keyName, data)
}
