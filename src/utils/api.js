import { getInstance } from 'd2'

const CREATED = 'CREATED'
const DELETED = 'DELETED'

class Api {
    cache = []
    ignoredStores = ['']

    /**
     * Initialized the Api to a d2 instance.
     * @returns {Api}
     */

    getNamespaces() {
        return getInstance().then((d2) =>
            d2.dataStore
                .getAll()
                .then((response) =>
                    response.filter(
                        (value) => this.ignoredStores.indexOf(value) === -1
                    )
                )
        )
    }

    createNamespace(namespace, key, value = {}) {
        return getInstance()
            .then((d2) => {
                return d2.dataStore.create(namespace).then((namespace) => {
                    return namespace.set(key, value)
                })
            })
            .catch((error) => Promise.reject(error))
    }

    deleteNamespace(namespace) {
        return getInstance().then((d2) =>
            d2.dataStore.delete(namespace).then((response) => {
                this.cache[namespace] = []
                return response
            })
        )
    }

    getKeys(namespace) {
        return getInstance()
            .then((d2) => d2.dataStore.get(namespace))
            .then((resName) => resName.getKeys())
            .catch((error) => Promise.reject(error))
    }

    /**
     * @param namespace
     * @param key
     */
    getValue(namespace, key) {
        return getInstance().then((d2) => {
            const url = `dataStore/${namespace}/${key}`
            return d2.Api.getApi().get(url)
        })
    }

    /**
     * @param namespace
     * @param key
     */
    getMetaData(namespace, key) {
        return getInstance()
            .then((d2) => d2.dataStore.get(namespace, false))
            .then((namespace) => namespace.getMetaData(key))
    }

    /**
     * @param namespace
     * @param key
     * @param value
     */
    createValue(namespace, key, value) {
        return getInstance()
            .then((d2) => d2.dataStore.get(namespace))
            .then((resName) => resName.set(key, value, true))
            .then((response) => {
                // cache value
                console.log(response)
                if (this.cache[namespace] === undefined) {
                    this.cache[namespace] = []
                }
                const ret = {
                    length: 0,
                    value: value,
                }
                this.cache[namespace][key] = ret

                return response
            })
    }

    /**
     * @param namespace
     * @param key
     * @param value
     */
    updateValue(namespace, key, value) {
        return getInstance()
            .then((d2) => d2.dataStore.get(namespace))
            .then((resName) => resName.update(key, value))
            .then((response) => {
                // cache value
                if (this.cache[namespace] === undefined) {
                    this.cache[namespace] = []
                }
                const ret = {
                    value: value,
                }

                this.cache[namespace][key] = ret
                return response
            })
    }
}

export default new Api()
