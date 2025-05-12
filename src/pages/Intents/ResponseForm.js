import React, { useState, useEffect } from 'react'
import { TextField } from '../../components/field/TextField'

const ResponseForm = ({ data = {}, onChange }) => {
    const [responseData, setResponseData] = useState(data)

    useEffect(() => {
        setResponseData(data)
    }, [data])

    const handleChange = (field, value) => {
        const updated = { ...responseData, [field]: value }
        setResponseData(updated)
        onChange('response.data', updated)
    }

    return (
        <div style={{ display: 'grid', gap: '8px' }}>
            <TextField
                label="Argument"
                value={responseData.argument || ''}
                onChange={(e) => handleChange('argument', e.value)}
                required
            />

            <TextField
                label="Path"
                value={responseData.path || ''}
                onChange={(e) => handleChange('path', e.value)}
                required
            />
        </div>
    )
}

export default ResponseForm
