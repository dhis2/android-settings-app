import hashHistory from './history'

export const reloadPage = () => {
    hashHistory.go(0)
}

export const navigateTo = path => {
    hashHistory.push(path)
}
