import React, { useEffect, useState } from 'react'
import { Button, IconAdd16, IconDelete16 } from '@dhis2/ui'
import { TextField } from '../../components/field/TextField'
import PropTypes from 'prop-types'

const generateId = () => Math.random().toString(36).substring(2, 10)

const RequestForm = ({ argumentsData = {}, onChange }) => {
    const [params, setParams] = useState([
        { id: generateId(), key: '', value: '' },
    ])

    useEffect(() => {
        const entries = Object.entries(argumentsData)
        const initialParams = entries.length
            ? entries.map(([key, value]) => ({
                  id: generateId(),
                  key,
                  value,
              }))
            : [{ id: generateId(), key: '', value: '' }]
        setParams(initialParams)
    }, [argumentsData])


    useEffect(() => {
        const updatedArgs = {}
        params.forEach(({ key, value }) => {
            if (key) updatedArgs[key] = value
        })
        onChange('request.arguments', updatedArgs)
    }, [params])

    const updateParent = (newParams) => {
        const updatedArgs = {}
        newParams.forEach(({ key, value }) => {
            if (key) updatedArgs[key] = value
        })
        onChange('request.arguments', updatedArgs)
    }

    const handleAdd = () => {
        setParams((prev) => [...prev, { id: generateId(), key: '', value: '' }])
    }

    const handleDelete = (id) => {
        setParams((prev) => prev.filter((param) => param.id !== id))
    }

    const handleChange = (id, field, fieldValue) => {
        const newParams = params.map((param) =>
            param.id === id ? { ...param, [field]: fieldValue } : param
        )
        setParams(newParams)
        updateParent(newParams)
    }

    return (
        <div>
            {params.map(({ id, key, value }) => (
                <div
                    key={id}
                    style={{
                        display: 'flex',
                        marginBottom: 8,
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        label="Key"
                        value={key}
                        onChange={({ value }) => handleChange(id, 'key', value)}
                    />
                    <TextField
                        label="Value"
                        value={value}
                        onChange={({ value }) =>
                            handleChange(id, 'value', value)
                        }
                    />

                    <Button
                        small
                        destructive
                        icon={<IconDelete16 />}
                        onClick={() => handleDelete(id)}
                    />
                </div>
            ))}
            <Button small icon={<IconAdd16 />} onClick={handleAdd}>
                Add parameter
            </Button>
        </div>
    )
}

RequestForm.propTypes = {
    argumentsData: PropTypes.object,
    onChange: PropTypes.func.isRequired,
}

export default RequestForm
