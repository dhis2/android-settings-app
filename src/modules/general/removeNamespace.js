import api from '../../utils/api'
import { NAMESPACE } from '../../constants/data-store'

export const removeNamespace = async () => {
    return api.deleteNamespace(NAMESPACE)
}
