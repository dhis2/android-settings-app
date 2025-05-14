import { Button, IconAdd16, IconDelete16 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { TextField } from '../../components/field/TextField'

const generateId = () => Math.random().toString(36).substring(2, 10)

const addIdsToParams = (params = []) =>
    params.length > 0
        ? params.map((p) => ({ ...p, id: generateId() }))
        : [{ id: generateId(), key: '', value: '' }]

const RequestForm = ({ argumentsData = [], onChange }) => {
    const [params, setParams] = useState(() => addIdsToParams(argumentsData))

    useEffect(() => {
        const cleanParams = params
            .filter((p) => p.key?.trim())
            .map(({ key, value }) => ({ key, value }))
        onChange('request.arguments', cleanParams)
    }, [params])

    const handleAdd = () => {
        setParams((prev) => [...prev, { id: generateId(), key: '', value: '' }])
    }

    const handleDelete = (id) => {
        setParams((prev) => prev.filter((param) => param.id !== id))
    }

    const handleChange = (id, field, fieldValue) => {
        setParams((prev) =>
            prev.map((param) =>
                param.id === id ? { ...param, [field]: fieldValue } : param
            )
        )
    }

    return (
        <div>
            {params.map(({ id, key, value }) => (
                <div
                    key={id}
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '1rem',
                        marginBottom: '1rem',
                    }}
                >
                    <div style={{ flex: 1 }}>
                        <TextField
                            label="Key"
                            value={key}
                            onChange={({ value }) =>
                                handleChange(id, 'key', value)
                            }
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <TextField
                            label="Value"
                            value={value}
                            onChange={({ value }) =>
                                handleChange(id, 'value', value)
                            }
                        />
                    </div>
                    <Button
                        small
                        destructive
                        icon={<IconDelete16 />}
                        onClick={() => handleDelete(id)}
                        disabled={params.length === 1}
                    />
                </div>
            ))}

            <div style={{ marginTop: '1rem' }}>
                <Button small icon={<IconAdd16 />} onClick={handleAdd}>
                    Add parameter
                </Button>
            </div>
        </div>
    )
}

RequestForm.propTypes = {
    argumentsData: PropTypes.array,
    onChange: PropTypes.func.isRequired,
}

export default RequestForm
