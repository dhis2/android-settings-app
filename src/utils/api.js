import { init, getInstance, getManifest } from 'd2'

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
        return getInstance().then(d2 =>
            d2.dataStore
                .getAll()
                .then(response =>
                    response.filter(
                        value => this.ignoredStores.indexOf(value) === -1
                    )
                )
        )
    }

    createNamespace(namespace, key) {
        return getInstance()
            .then(d2 => {
                console.log(d2.dataStore)
                d2.dataStore.create(namespace).then(namespace => {
                    namespace.set(key, {})
                })
            })
            .then(name => console.log(name))
            .catch(error => Promise.reject(error))
    }

    deleteNamespace(namespace) {
        return getInstance().then(d2 =>
            d2.dataStore.delete(namespace).then(response => {
                this.cache[namespace] = []
                return response
            })
        )
    }

    getKeys(namespace) {
        return getInstance()
            .then(d2 => d2.dataStore.get(namespace))
            .then(resName => resName.getKeys())
            .catch(error => Promise.reject(error))
    }

    /**
     * @param namespace
     * @param key
     */
    getValue(namespace, key) {
        const cache = this.cache

        // check for cache hit
        if (
            cache[namespace] === undefined ||
            cache[namespace][key] === undefined
        ) {
            return this.getMetaData(namespace, key).then(result => {
                const jsonLength = result.value.length
                const val = JSON.parse(result.value)

                // cache result
                if (cache[namespace] === undefined) {
                    cache[namespace] = []
                }
                const ret = {
                    length: jsonLength,
                    value: val,
                }
                cache[namespace][key] = ret

                return ret
            })
        }

        return new Promise(resolve => {
            console.log('cache resolve')
            resolve(cache[namespace][key])
        })
    }

    /**
     * @param namespace
     * @param key
     */
    getMetaData(namespace, key) {
        return getInstance()
            .then(d2 => d2.dataStore.get(namespace, false))
            .then(namespace => namespace.getMetaData(key))
    }

    /**
     * @param namespace
     * @param key
     * @param value
     */
    createValue(namespace, key, value) {
        return getInstance()
            .then(d2 => d2.dataStore.get(namespace))
            .then(resName => resName.set(key, value, true))
            .then(response => {
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
            .then(d2 => d2.dataStore.get(namespace))
            .then(resName => resName.update(key, value))
            .then(response => {
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

    /**
     * Updates the history of the namespace
     * @param namespace
     * @param key
     * @param historyRecord
     */
    updateNamespaceHistory(namespace, key, historyRecord) {
        const namespaceHistoryRecord = {
            name: namespace,
            action: historyRecord.action,
            date: new Date(),
            user: historyRecord.user,
            value: `Key '${key}' was '${historyRecord.action.toLowerCase()}.`,
        }

        return this.getHistory(namespace)
            .then(history => {
                history.unshift(namespaceHistoryRecord)

                if (historyRecord.action === DELETED) {
                    // special check for delete action
                    this.getKeys(namespace)
                        .then(response => {
                            if (response.length < 1) {
                                // last key in namespace was deleted, namespace got deleted too
                                history.unshift({
                                    name: namespace,
                                    action: DELETED,
                                    date: new Date(),
                                    user: historyRecord.user,
                                    value: 'Namespace was deleted.',
                                })

                                delete this.cache[namespace]
                            }

                            this.updateValue(
                                'HISTORYSTORE',
                                namespace,
                                history,
                                false
                            )
                        })
                        .catch(e => {
                            console.log(e)
                        })
                } else {
                    // create or update action
                    this.updateValue('HISTORYSTORE', namespace, history, false)
                }
            })
            .catch(e => {
                if (e.httpStatusCode === 404) {
                    // this history record is first
                    const value = [
                        {
                            name: namespace,
                            action: CREATED,
                            date: namespaceHistoryRecord.date,
                            user: historyRecord.user,
                            value: 'Namespace was created.',
                        },
                    ]
                    return this.createValue(
                        'HISTORYSTORE',
                        namespace,
                        value,
                        false
                    )
                        .then(
                            response =>
                                new Promise((resolve, reject) => resolve(value))
                        )
                        .then(history => {
                            history.unshift(namespaceHistoryRecord)
                            this.updateValue(
                                'HISTORYSTORE',
                                namespace,
                                history,
                                false
                            )
                        })
                }
            })
    }

    /**
     * @param namespace
     * @param key
     */
    buildId(namespace, key) {
        return encodeURIComponent(`${namespace}:${key}`)
    }
}

export default new Api()
