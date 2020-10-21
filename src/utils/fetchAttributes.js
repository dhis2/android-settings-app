const fetchAttributes = async attribute => {
    const fetcher = url =>
        fetch(url, { credentials: 'include' })
            .then(resp => {
                if (resp.status >= 200 && resp.status < 300) {
                    return Promise.resolve(resp.json())
                } else {
                    throw resp
                }
            })
            .catch(resp => {
                const error = new Error(resp.statusText || resp.status)
                console.error(
                    `fetchAttributes ${attribute.filter} fetch error: `,
                    error
                )
                return Promise.reject(error)
            })

    const fields = `${attribute.field}`
    const filters = `${attribute.filter}`
    const url = `${attribute.url}.json?paging=false&fields=${fields}&filter=${filters}`

    const json = await fetcher(url).catch(error => Promise.reject(error))

    console.log({ json, att: json[attribute.attribute] })
    return json[attribute.attribute]
}

export default fetchAttributes
