import { useHistory } from 'react-router-dom'

export const useNavigation = () => {
    const history = useHistory()

    return {
        reloadPage: () => {
            history.go(0)
        },
        navigateTo: path => {
            history.push(path)
        },
    }
}
